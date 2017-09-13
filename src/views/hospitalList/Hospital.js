import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import styles from './HospitalStyle';

class Hospital extends Component {

  render() {
    const { id, name, pictureUrl, city, hospitalSelected } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => hospitalSelected(id)}>
          <Image
            style={styles.image}
            source={{ uri: pictureUrl }}
            resizeMode="stretch"
          />
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.city}>{city}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

Hospital.propTypes = {
  name: PropTypes.string.isRequired,
  pictureUrl: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  hospitalSelected: PropTypes.func.isRequired,
};

export default Hospital;
