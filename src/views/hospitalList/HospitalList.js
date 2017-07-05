import HospitalView from './HospitalListView';
import { connect } from 'react-redux';

const mapStateToProps =  state =>  {
  return (
    { 
      dummyMessage:'wwwww'});
};

export default connect(mapStateToProps)(HospitalView);