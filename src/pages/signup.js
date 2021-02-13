/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import swal from 'sweetalert';
import { signUp, login } from '../api/index';

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .max(255, 'Too Long!')
    .required('Your name is required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Your email is required'),
  password: Yup.string()
    .required('A password is required.')
    .min(12, 'Password is too short - Minimum 12 characters.')
    .matches(/(?=.*(\W))(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]/, 'Must have at least one uppercase and one non-alphanumeric character'),
});

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  render() {
    const { loading } = this.state;
    return (
      <div className="auth-wrapper">
        <div className="auth-inner">
          <Formik
            initialValues={{
              name: '',
              email: '',
            }}
            validationSchema={SignupSchema}
            onSubmit={(values) => {
              this.setState({
                loading: true,
              });
              signUp(values).then(() => {
                login({
                  email: values.email,
                  password: values.password,
                }).then(() => {
                  this.setState({
                    loading: false,
                  });
                  swal({
                    title: 'Signup Successful',
                    text: 'You will now be logged in!',
                    icon: 'success',
                    button: 'Proceed',
                    // eslint-disable-next-line no-return-assign
                  }).then(() => window.location = '/users');
                }).catch(({ data: error }) => {
                  this.setState({
                    loading: false,
                  });
                  swal({
                    title: 'Signup Failed',
                    text: error.message,
                    icon: 'error',
                  });
                });
              }).catch(({ data: error }) => {
                this.setState({
                  loading: false,
                });
                swal({
                  title: 'Signup Failed',
                  text: error.message,
                  icon: 'error',
                });
              });
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <h3>Sign Up</h3>

                <div className="form-group">
                  <label>Name</label>
                  <Field type="text" name="name" className="form-control" placeholder="Name" />
                  {errors.name && touched.name ? (<div className="text-danger">{errors.name}</div>) : null}
                </div>

                <div className="form-group">
                  <label>Email address</label>
                  <Field type="email" name="email" className="form-control" placeholder="Enter email" />
                  {errors.email && touched.email ? (<div className="text-danger">{errors.email}</div>) : null}
                </div>

                <div className="form-group">
                  <label>Password</label>
                  <Field type="password" name="password" className="form-control" placeholder="Enter password" />
                  {errors.password && touched.password ? (<div className="text-danger">{errors.password}</div>) : null}
                </div>

                <button type="submit" className="btn btn-primary btn-block">
                  Sign Up
                  {loading && (
                  <span className="spinner-border spinner-border-sm mx-2" />
                  )}
                </button>
                <p className="small-text text-right">
                  Already registered?
                  {' '}
                  <Link to="/">Sign in</Link>
                </p>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  }
}
