import React, { Component } from 'react';
import { connect } from 'react-redux';
import InstitutesListView from './InstitutesListView';
import { getInstitutes, selectInstitute } from '../../store/modules/Institutes'

class InstitutesList extends Component {

constructor(){
  super()
  this.onInstSelected = this.onInstSelected.bind(this)
}

  componentDidMount() {
    this.props.getInstitutes();
  }

  onInstSelected(instId) {
    this.props.selectInstitute(instId);
    this.props.navigation.navigate('SelectDate');
  }

  render() {
    console.log(this.props)
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
  //console.log('state:',state)
  return (
  {
    institutes: state.institues.institutes,
  }
)
}

export default connect(mapStateToProps, { getInstitutes, selectInstitute })(InstitutesList);
//export default InstitutesList
