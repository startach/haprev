import React from 'react'
import { View, Text, StyleSheet, Button, Image } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Swiper from 'react-native-swiper'

const HomeView = (props) => {
    onRegister = () => { }
    onAllActivity = () => { }
    onCreateActivity = () => { }

    const { first, last, coordinator } = props
    const isAdmin = (coordinator > 0)
    console.log(first, last, coordinator)
    

    const arrow = (<Icon name="long-arrow-left" size={30} color="#900" />)
    const arrowDown = (<Icon name="arrow-down" size={30} color="#900" />)
    const registerButton = (
        <Button
            onPress={onRegister}
            title="הרשמה"
            color="#841584"
        />
    )

    const allActivityButton = (
        <View style={styles.allActivityButton}>
            <Button
                onPress={onAllActivity}
                title="לכל ההתנדבויות"
                color="#841584"
            />
        </View>
    )

    const createActivityButton = (
        <View style={styles.allActivityButton}>
            <Button
                onPress={onCreateActivity}
                title="יצירת התנדבות"
                color="#841584"
            />
        </View>
    )


    return (
        <View style={styles.container}>
            {!isAdmin ?
                <View style={styles.helloBox}>
                    <Text style={styles.text}> הי {first} {last} כיף לראות אותך פה ! </Text>
                    <Text style={styles.text}> כדי להירשם להנדבות הבאה אפשר </Text>
                    <View style={styles.registerButton}>
                        <Text style={styles.text}> {arrow} להתחיל פה  </Text>
                        {registerButton}
                    </View>
                </View>
            :
                <View style={styles.helloBox}>
                    <Text style={styles.text}> הי {first} {last} המתנדבים של {coordinator} </Text>
                    <Text style={styles.text}> מחכים להתנדבות הבאה שלהם </Text>
                    <Text style={styles.text}> בשביל לעזור להם ולהתחיל התנדבות </Text>
                    <Text style={styles.text}> {arrowDown} חדשה אפשר להתחיל כאן </Text>
                    {createActivityButton}
                </View>
            }

            <View style={styles.helloBox}>
                <Text style={styles.textCenter}>התנדבות הבאה תתקיים בתאריך</Text>
                <Text style={styles.textCenter}>...</Text>
            </View>
            <View style={styles.helloBox}>
                <Text style={styles.textCenter}>התנדבות שלי</Text>
                <Text style={styles.textCenter}>...</Text>
                {allActivityButton}
            </View>
            <Text style={styles.textCenter}>באנו לשמח, תראו בעצמכם</Text>
            <Swiper style={styles.helloBox}>
                <Image style={styles.picture} source={require('../../images/vol1.jpg')} />
                <Image style={styles.picture} source={require('../../images/vol2.jpg')} />
                <Image style={styles.picture} source={require('../../images/vol3.jpg')} />
                <Image style={styles.picture} source={require('../../images/vol4.jpg')} />
                <Image style={styles.picture} source={require('../../images/vol5.jpg')} />
                <Image style={styles.picture} source={require('../../images/vol6.jpg')} />
                <Image style={styles.picture} source={require('../../images/vol7.jpg')} />
                <Image style={styles.picture} source={require('../../images/vol8.jpg')} />
            </Swiper>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flex: 1
    },
    picture: {
        flex: 1
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'right'
    },
    textCenter: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    helloBox: {
        marginBottom: 10,
        marginRight: 10,
        marginLeft: 10,
        backgroundColor: '#f4f6f5',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: 'blue',
    },
    registerButton: {
        flexDirection: 'row-reverse',
        alignSelf: 'center',
        marginBottom: 10,
        marginTop: 10,
        marginRight: 10,
        marginLeft: 10,
    },
    allActivityButton: {
        alignSelf: 'flex-start',
        marginBottom: 10,
        marginTop: 10,
        marginRight: 10,
        marginLeft: 10,
    }
})

export default HomeView