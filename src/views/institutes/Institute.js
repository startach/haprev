import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import styles from './InstituteStyle'

class Institute extends Component {
  render() {
    const { id, name, pictureUrl, city, instituteSelected } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => instituteSelected(id)}>
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

Institute.propTypes = {
  name: PropTypes.string.isRequired,
  pictureUrl: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  instituteSelected: PropTypes.func.isRequired,
};

export default Institute;
