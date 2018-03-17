import React, { Component } from 'react';
import { connect } from 'react-redux';
import SelectDateView from './SelectDateView';

class SelectDate extends Component {
  render() {
    const {vols} = this.props
    let calanderVols={}
    if (vols){
      calanderVols = this.buildCalVols(vols)
    }
    return (
      <SelectDateView vols= {calanderVols} />
    );
  }

  buildCalVols = vols =>{
    let tmpRes = {}
    const calVols = vols.map (curVol =>
      tmpRes[curVol.date] ={startingDay:true, endingDay:true,textColor:'white', color:'#50D050'}
    )
    return tmpRes
  }

}

mapStateToProps = state =>{
  return {
    vols:state.institues.vols
  }
}

export default connect (mapStateToProps)  (SelectDate);
