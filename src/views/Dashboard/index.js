import DashboardView from './DashboardView';
import { connect } from 'react-redux';
import {dummy}  from '../../store/actions';

const mapStateToProps =  state =>  {
  return (
    { screenName: state.dummyReducer.dummy,
      dummyMessage:'wwwww'});
};

export default connect(mapStateToProps, {sendDummy:dummy})(DashboardView);