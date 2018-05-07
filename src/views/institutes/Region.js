import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { StyleSheet, View, Text, ScrollView } from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  name: {
    // fontFamily: 'Arimo',
    color: '#2c2c2c',
    fontSize: 28,
    fontWeight: '400',
    lineHeight: 40,
    textAlign: 'right',
  },
  hospitalsSection: {
    flex: 1,
    height: 270,
  },
});

class Region extends Component {
  render() {
    const { name, children } = this.props;
    return (
      <View>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.hospitalsSection}>
          <ScrollView horizontal>
            {children}
          </ScrollView>
        </View>
      </View>
    );
  }
}

Region.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Region;
