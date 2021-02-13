/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import swal from 'sweetalert';
import * as Yup from 'yup';
import { login, getToken } from '../api/index';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email().required('Your email is required'),
  password: Yup.string().required('Your password is required.'),
});

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      isAuth: !!getToken(),
    };
  }

  render() {
    const { loading, isAuth } = this.state;
    const { location: { state: needsLogin = false } = {} } = this.props;
    return (
      <div className="auth-wrapper">
        <div className="auth-inner">

          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={LoginSchema}
            onSubmit={(values) => {
              this.setState({
                loading: true,
              });
              login(values).then(() => {
                this.setState({
                  loading: false,
                });
                swal({
                  title: 'Login Successful',
                  text: 'You have been logged in!',
                  icon: 'success',
                  button: 'Proceed',
                // eslint-disable-next-line no-return-assign
                }).then(() => window.location = '/users');
              }).catch(({ data: error }) => {
                this.setState({
                  loading: false,
                });
                swal({
                  title: 'Login Failed',
                  text: error.message,
                  icon: 'error',
                });
              });
            }}
          >
            {({ errors, touched }) => (
              <Form>
                {needsLogin && (
                  <div className="row justify-content-center">
                    <span className="text-danger text-center">You must be logged in to view that page</span>
                  </div>
                )}
                <h3>Sign In</h3>
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
                  Login
                  {loading && (
                  <span className="spinner-border spinner-border-sm mx-2" />
                  )}
                </button>
                {isAuth ? (
                  <p className="small-text">
                    You already have an account
                    {' '}
                    <Link to="/users">Go to users here</Link>
                  </p>
                ) : (
                  <p className="small-text">
                    New here?
                    {' '}
                    <Link to="/sign-up">Sign up</Link>
                  </p>
                )}

              </Form>
            )}
          </Formik>
        </div>
      </div>

    );
  }
}
