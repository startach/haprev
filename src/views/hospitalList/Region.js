import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Container, Card, CardItem, Text } from 'native-base';

class Region extends Component {
  render() {
    const { name, children } = this.props;
    return (
      <Container>
        <Card>
          <CardItem>
            <Text>{name}</Text>
            {children}
          </CardItem>
        </Card>
      </Container>
    );
  }
}

Region.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Region;
