import React from 'react';
import PropTypes from 'prop-types';
import { Image, Text, View } from 'react-native';
import styles from './HospitalStyle';


const Hospital = ({ name, pictureUrl, city }) => (
  <View style={styles.container}>
    <Image
      style={styles.image}
      source={{ uri: pictureUrl }}
      resizeMode="stretch"
    />
    <Text style={styles.name}>{name}</Text>
    <Text style={styles.city}>{city}</Text>

  </View>

);

Hospital.propTypes = {
  name: PropTypes.string.isRequired,
  pictureUrl: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
};

export default Hospital;
