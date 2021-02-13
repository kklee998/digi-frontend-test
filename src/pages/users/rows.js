/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';

const Rows = ({
  idx, id, name, email,
}) => (
  <tr>
    <td>{idx}</td>
    <td>{id}</td>
    <td>{name}</td>
    <td>{email}</td>
  </tr>
);

Rows.defaultProps = {
  idx: 1,
  id: '',
  name: '',
  email: '',
};
Rows.propTypes = {
  idx: PropTypes.number,
  id: PropTypes.string,
  name: PropTypes.string,
  email: PropTypes.string,
};

export default Rows;
