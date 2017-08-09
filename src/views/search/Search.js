
import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchView from './SearchView';
import { getHospitals } from '../../store/modules/hospitals';

class Search extends Component {
  componentDidMount() {
    this.props.getHospitals();
  }

  render() {
    const { navigation, avatar, hospitals } = this.props;
    return (
      <SearchView
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
