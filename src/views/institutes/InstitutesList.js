import React, { Component } from 'react';
import { connect } from 'react-redux';
import InstitutesListView from './InstitutesListView';
import { getInstitutes, selectInstitute } from '../../store/modules/Institutes'
import {namesOfHospitals} from '../../services'

class InstitutesList extends Component {

constructor(){
  super()
  this.onInstSelected = this.onInstSelected.bind(this)
}

  componentDidMount() {
    this.props.getInstitutes();
  }

  async onInstSelected(instId) {
    await this.props.selectInstitute(instId);
    hospitalName = namesOfHospitals[instId].name
    this.props.navigation.navigate('SelectDate',{hospitalName});
  }

  render() {
    const {  institutes } = this.props;
    return (
      <InstitutesListView
      institutes={institutes}
      onInstSelected={this.onInstSelected}
      />
    );
  }
}

const mapStateToProps = state =>{
  return ({
    institutes: state.institues.institutes,
  })
}

export default connect(mapStateToProps, { getInstitutes, selectInstitute })(InstitutesList);
