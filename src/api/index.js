import axios from 'axios';

const API_URL = 'https://backend-test-kk.herokuapp.com';

const login = async (loginBody) => {
  try {
    const { data } = await axios.post(`${API_URL}/user/login`, loginBody);

    if (data) {
      localStorage.setItem('user', JSON.stringify(data.accessToken));
    }
    return data;
  } catch (error) {
    throw error.response;
  }
};

const signUp = async (signUpBody) => {
  try {
    const { data } = await axios.post(`${API_URL}/user`, signUpBody);
    return data;
  } catch (error) {
    throw error.response;
  }
};

// Since the backend doesn't actually keep any sessions, removing the token will
// essentiall log the user out
const logout = () => localStorage.removeItem('user');

const getToken = () => JSON.parse(localStorage.getItem('user'));

const getUsers = async (q = '') => {
  const user = JSON.parse(localStorage.getItem('user'));
  let headers = {};
  if (user) {
    headers = { Authorization: `Bearer ${user}` };
  }
  try {
    const { data } = await axios.get(`${API_URL}/user`, {
      params: {
        q,
      },
      headers,
    });

    return data;
  } catch (error) {
    throw error.response;
  }
};

export {
  login, signUp, logout, getToken, getUsers,
};
