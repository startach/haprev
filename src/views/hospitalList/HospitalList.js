import { connect } from 'react-redux';
import HospitalListView from './HospitalListView';


const mapStateToProps = state => (
  {
    dummyMessage: 'wwwww' });

export default connect(mapStateToProps)(HospitalListView);
