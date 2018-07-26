import React, { Component } from 'react';
import { connect } from 'react-redux';
import InstitutesListView from './InstitutesListView';
import { getInstitutes, selectInstitute } from '../../store/modules/Institutes'

class InstitutesList extends Component {

constructor(){
  super()
  this.onInstSelected = this.onInstSelected.bind(this)
}

  async onInstSelected(instId) {
    await this.props.selectInstitute(instId);
    hospitalName = this.props.institutes[instId-1].name
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
    institutes: state.institutes.institutes,
  })
}

export default connect(mapStateToProps, { getInstitutes, selectInstitute })(InstitutesList);
