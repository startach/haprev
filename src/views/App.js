import React from "react";
import { View } from "react-native";
import { Container, Content, Button, Text, connectStyle } from "native-base";
import Expo from "expo";
import PropTypes from 'prop-types';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isReady: false
    };
  }
  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    });

    this.setState({ isReady: true });
  }
  render() {
    const styles = this.props.style;
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }
    return (
      <Container style={styles.container}>
        <Content style={styles.content}>
          <View style={styles.contentView}>
            <Text style={styles.title}>הרשמו והפכו לחלק ממהפכה של שמחה!</Text>
            <View style={styles.buttonsContainer}>
              <Button block rounded style={styles.button}>
                <Text>התחברו באמצעות F</Text>
              </Button>
            </View>
            <View style={styles.buttonsContainer}>
              <Button block rounded style={styles.button}>
                <Text>צרו חשבון חדש</Text>
              </Button>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  content: {
    flex: 1
  },
  contentView: {
    alignItems: 'center'
  },
  title: {
    fontSize: 18,
    fontFamily: "Roboto_medium"
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20
  },
  buttonsContainer: {
    justifyContent: "center",
    alignItems: "center"
  }
};

App.propTypes = {
  style: PropTypes.object.isRequired,
}
// connect the component to the theme
export default connectStyle("yourTheme.CustomComponent", styles)(App);
