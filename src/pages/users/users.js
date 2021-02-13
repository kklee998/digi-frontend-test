/* eslint-disable class-methods-use-this */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { getUsers, logout } from '../../api/index';
import Rows from './rows';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      loading: true,
      authed: true,
    };
  }

  async componentDidMount() {
    /**
     * Checks if user has a valid token by calling the endpoint.
     * Redirects to login if the token is invalid
     */
    try {
      const users = await getUsers();
      this.setState({
        users,
        loading: false,
      });
    } catch (error) {
      this.setState({
        authed: false,
        loading: false,
      });
    }
  }

  searchUsers(q) {
    this.setState({
      loading: true,
    });
    getUsers(q).then((users) => {
      this.setState({
        users,
        loading: false,
      });
    }).catch((error) => {
      if (error.statusCode === '401') {
        this.setState({
          authed: false,
          loading: false,
        });
      }
    });
  }

  logout() {
    logout();
  }

  render() {
    const { users, loading, authed } = this.state;
    if (!authed) {
      return <Redirect to={{ pathname: '/', state: { needsLogin: true } }} />;
    }
    return (
      <div className="user-wrapper">
        <div className="user-inner">
          <div className="row">
            <h3 className="row col-md-6">List of Users</h3>
            <h3 className="col-md-6 text-right">
              <Link to="/" onClick={this.logout}> Logout </Link>
            </h3>

            <div className="form-outline">
              <label className="form-label" htmlFor="form1">Search</label>
              {loading && (
              <span className="spinner-border spinner-border-sm mx-2" />
              )}
              <input
                type="search"
                id="search"
                className="form-control mb-4"
                placeholder="Enter a name . . ."
                onKeyUp={(e) => {
                  e.preventDefault();
                  if (e.key === 'Enter') {
                    this.searchUsers(e.target.value);
                  }
                }}
              />
            </div>

            <table className="table table-striped table-bordered">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                </tr>
              </thead>
              <tbody>
                {
                users.length > 0
                  ? users.map(
                    (
                      { id, name, email },
                      idx,
                    ) => <Rows key={id} idx={idx + 1} id={id} name={name} email={email} />,
                  )
                  : (
                    <tr>
                      <td colSpan="4" className="text-center">
                        No users
                      </td>
                    </tr>
                  )
              }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
