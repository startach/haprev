import React from 'react'
import { View, Text, StyleSheet, Button, Image, Dimensions, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Swiper from 'react-native-swiper'

const HomeView = (props) => {
    onRegister = () => { }
    onAllActivity = () => { }
    onCreateActivity = () => { }
    const { first, last, coordinator } = props
    const isAdmin = (coordinator > 0)
    //console.log(first, last, coordinator)

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
        <ScrollView horizontal={false}>
            <View style={styles.container}>
                {!isAdmin ?
                    <View style={[styles.box,styles.helloBox]}>
                        <Text style={styles.textCenter}> היי {first} {last} כיף לראות אותך פה ! </Text>
                        <Text style={styles.textCenter}> כדי להירשם להנדבות הבאה אפשר </Text>
                        <View style={styles.registerButton}>
                            <Text style={styles.textCenter}> {arrow} להתחיל פה  </Text>
                            {registerButton}
                        </View>
                    </View>
                :
                    <View style={[styles.box,styles.helloBox]}>
                        <Text style={styles.textCenter}> היי {first} {last} המתנדבים של {coordinator} </Text>
                        <Text style={styles.textCenter}> מחכים להתנדבות הבאה שלהם </Text>
                        <Text style={styles.textCenter}> בשביל לעזור להם ולהתחיל התנדבות </Text>
                        <Text style={styles.textCenter}> {arrowDown} חדשה אפשר להתחיל כאן </Text>
                        {createActivityButton}
                    </View>
                }
                <View style={[styles.box,styles.nextVollBox]}>
                    <Text style={styles.textCenter}>התנדבות הבאה תתקיים בתאריך</Text>
                    <Text style={styles.textCenter}>...</Text>
                </View>
                <View style={[styles.box,styles.myVollBox]}>
                    <Text style={styles.textCenter}>התנדבות שלי</Text>
                    <Text style={styles.textCenter}>...</Text>
                    {allActivityButton}
                </View>
                <Text style={[styles.textCenter,{marginBottom:5}]}>באנו לשמח, תראו בעצמכם</Text>
                <View style={[styles.box,styles.swiper]}>
                    <Swiper>
                        <Image style={styles.picture} source={require('../../images/splash.jpg')} />
                        <Image style={styles.picture} source={require('../../images/splash.jpg')} />
                        <Image style={styles.picture} source={require('../../images/splash.jpg')} />
                        <Image style={styles.picture} source={require('../../images/splash.jpg')} />
                    </Swiper>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 8,
        flex: 1,
    },
    picture: {
        flex: 1,
        width:'100%',
    },
    textCenter: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    box: {
        marginBottom: 8,
        marginRight: 10,
        marginLeft: 10,
        backgroundColor: '#f4f6f5',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#841584',
    },
    registerButton: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginBottom: 10,
        marginTop: 10,
        marginRight: 10,
        marginLeft: 10,
    },
    allActivityButton: {
        alignSelf: 'center',
        marginBottom: 10,
        marginTop: 10,
        marginRight: 10,
        marginLeft: 10,
    },
    nextVollBox:{
        height:Dimensions.get('screen').height/10,
    },
    helloBox:{
        height:Dimensions.get('screen').height/6,        
    },
    myVollBox:{
        height:Dimensions.get('screen').height/6,
    },
    swiper:{
        height:Dimensions.get('screen').height/3,
    },
})

export default HomeView