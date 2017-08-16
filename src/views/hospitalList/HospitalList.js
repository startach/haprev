import React, { Component } from 'react';
import { connect } from 'react-redux';
import HospitalListView from './HospitalListView';
import { getHospitals } from '../../store/modules/hospitals';

class Search extends Component {
  componentDidMount() {
    this.props.getHospitals();
  }

  render() {
    const { navigation, avatar, hospitals } = this.props;
    return (
      <HospitalListView
        navigation={navigation}
        avatar={avatar}
        hospitals={hospitals}
      />
    );
  }
}

const mapStateToProps = state => (
  {
    avatar: state.user.user.avatar,
    hospitals: state.hospitals.hospitals,
  }
);

export default connect(mapStateToProps, { getHospitals })(Search);
