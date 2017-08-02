import React from 'react';
import {View, Image, I18nManager} from 'react-native';
import {
    Container,
    Content,
    Button,
    Text,
    connectStyle,
    Icon
} from 'native-base';
import Expo from 'expo';
import PropTypes from 'prop-types';

const bg = require('../../images/bg.jpg');
const logo = require('../../images/logo.png');

const IS_RTL = I18nManager.isRTL;

class GuestIntro extends React.Component {
    constructor() {
        super();
        this.state = {
            isReady: false
        };

    }

    async componentWillMount() {
        await Expo.Font.loadAsync({
            Roboto: require('native-base/Fonts/Roboto.ttf'),
            Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
            Ionicons: require('@expo/vector-icons/fonts/Ionicons.ttf')
        });
        this.setState({isReady: true});
    }

    render() {
        const styles = this.props.style;
        if (!this.state.isReady) {
            return <Expo.AppLoading/>;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        }
        return (
            <Image source={bg} style={styles.backgroundImage}>
                <View style={styles.contentView}>
                    <Image source={logo} style={styles.logoImage}/>
                    <View style={styles.titlesContainer}>
                        <Text style={styles.title}>שימו לב!</Text>
                        <Text style={styles.subtitle}>כניסת אורחים לא מאפשרת רישום מתנדבים.</Text>
                    </View>
                    <View style={styles.buttonsContainer}>
                        <Button rounded style={styles.registerButton}>
                            <Text>הבנתי. המשך...</Text>
                        </Button>
                    </View>
                </View>
            </Image>
        );
    }
}

const styles = {
    backgroundImage: {
        flex: 1,
        width: undefined,
        height: undefined,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    logoImage: {
        alignSelf: 'center',
        width: 150,
        resizeMode: 'contain',
        padding: 20,
        margin: 0
    },
    contentView: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentContainer: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 28,
        fontFamily: 'Roboto_medium',
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#FFF'
    },
    titlesContainer: {
        padding: 20
    },
    subtitle: {
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 28,
        fontFamily: 'Roboto_medium',
        textAlign: 'center',
        color: '#FFF'
    },
    button: {
        justifyContent: 'center',
        marginTop: 20,
        width: '100%'
    },
    buttonsContainer: {
        justifyContent: 'center'
    },
};

GuestIntro.propTypes = {
    style: PropTypes.object.isRequired
};
// connect the component to the theme
export default connectStyle('yourTheme.CustomComponent', styles)(GuestIntro);
