import React, { Component } from 'react';
import { connect } from 'react-redux';
import HospitalListView from './HospitalListView';
import { getHospitals, selectHospital } from '../../store/modules/hospitals';

class Search extends Component {

constructor(){
  super()
  this.onHospitalSelected = this.onHospitalSelected.bind(this)
}

  componentDidMount() {
    this.props.getHospitals();
  }

  onHospitalSelected(hospitalId) {
    selectHospital(hospitalId);
    this.props.navigation.navigate('SelectDate');
  }

  render() {
    const {  avatar, hospitals } = this.props;
    return (
      <HospitalListView
        avatar={avatar}
        hospitals={hospitals}
        onHospitalSelected={this.onHospitalSelected}
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

export default connect(mapStateToProps, { getHospitals, selectHospital })(Search);
