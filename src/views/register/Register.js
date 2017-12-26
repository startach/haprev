import React, { Component } from 'react';
import { connect } from 'react-redux';
import RegisterView from './RegisterView';

class Register extends Component {

  
  render() {
    return (
      <RegisterView     />
    );
  }
}

const mapStateToProps = state => (
  {
    avatar: state.user.user.avatar,
    hospitals: state.hospitals.hospitals,
  }
);

//export default connect(mapStateToProps, { getHospitals, selectHospital })(Search);
export default Register;