import React, { Component, PropTypes } from 'react';
import { Image, Text } from 'react-native';
import { Container, Header, Left, Card, CardItem, Body } from 'native-base';
import styles from './HospitalStyle';

class Hospital extends Component {
  render() {
    const { name, pictureUrl, city } = this.props;
    return (
      <Card >
        <CardItem>
          <Body>
            <Image
              style={styles.image}
              source={{ uri: 'https://facebook.github.io/react/img/logo_og.png' }}
            />
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.city}>{city}</Text>
          </Body>
        </CardItem>
      </Card>

    );
  }
}

Hospital.propTypes = {
  name: PropTypes.string.isRequired,
  pictureUrl: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
};

export default Hospital;
