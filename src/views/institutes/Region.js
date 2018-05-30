import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { StyleSheet, View, Text, ScrollView } from 'react-native';

const styles = StyleSheet.create({
  name: {
    color: '#2c2c2c',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'left',
    paddingRight:10,

  },
  hospitalsSection: {
    flex: 1,
    alignSelf: 'flex-start',
    marginTop: 5,
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
