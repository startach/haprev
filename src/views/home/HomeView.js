import React from 'react'
import { View, Text, StyleSheet, Button, Image, Dimensions, ScrollView,ActivityIndicator } from 'react-native'
import Swiper from 'react-native-swiper'

const HomeView = (props) => {
    const { first, last, coordinator, hospital, createActivityView, registerActivityView, activityView} = props

    const isCoordinator = (coordinator > 0)
    const registerButton = (
        <Button
            onPress={registerActivityView}
            title='הרשמה'
            color='#C2185B'
        />
    )

    const allActivityButton = (
        <View style={styles.allActivityButton}>
            <Button
                onPress={activityView}
                title='לכל ההתנדבויות'
                color='#C2185B'
            />
        </View>
    )

    const createActivityButton = (
        <View style={styles.allActivityButton}>
            <Button
                onPress={createActivityView}
                title='יצירת התנדבות'
                color='#C2185B'
            />
        </View>
    )

    return (
        <ScrollView horizontal={false}>
            <View style={styles.container}>
                {!isCoordinator ?
                    <View style={styles.eventBox}>
                        <Text style={styles.textCenter}> היי {first} {last} כיף לראות אותך פה ! </Text>
                        <Text style={styles.textCenter}> כדי להירשם להתנדבות הבאה אפשר </Text>
                        <View style={styles.registerButton}>
                            <Text style={styles.textCenter}>  להתחיל פה  </Text>
                            {registerButton}
                        </View>
                    </View>
                :
                    <View style={styles.eventBox}>
                        <Text style={styles.textCenter}> היי {first} {last} המתנדבים של {hospital} </Text>
                        <Text style={styles.textCenter}> מחכים להתנדבות הבאה שלהם </Text>
                        {createActivityButton}
                    </View>
                }
                <View style={[styles.eventBox,{backgroundColor:'#C2185B',borderColor:'#ffffff'}]}>
                    <Text style={[styles.textCenter,{color:'#ffffff'}]}>התנדבות הבאה תתקיים בתאריך</Text>
                    <Text style={[styles.textCenter,{color:'#ffffff'}]}>...</Text>
                </View>
                <View style={styles.eventBox}>
                    <Text style={styles.textCenter}>התנדבות שלי</Text>
                    <Text style={styles.textCenter}>...</Text>
                    {allActivityButton}
                </View>
                <Text style={[styles.textCenter,{marginBottom:5}]}>באנו לשמח, תראו בעצמכם</Text>
                <View style={[styles.box,styles.swiper]}>
                    <Swiper 
                    loadMinimalLoader={<ActivityIndicator size='large' color='#C2185B'/>}  
                    activeDotColor={'#C2185B'}
                    dotColor={'grey'}
                    autoplay                    
                    autoplayTimeout={4}
                    showsButtons
                    nextButton={<Text style={styles.buttonText}>›</Text>} 
                    prevButton={<Text style={styles.buttonText}>‹</Text>}
                    >
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
        borderRadius: 8,
    },
    textCenter: {
        textAlign: 'center',
        fontSize: 16,
        padding: 1,
        fontWeight: 'bold',
        color:'#C2185B'
    },
    box: {
        marginBottom: 5,
        marginRight: 25,
        marginLeft: 25,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#C2185B',
        justifyContent: 'flex-start',
    },
    registerButton: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginBottom: 5,
        marginTop: 5,
        marginRight: 10,
        marginLeft: 10,
    },
    allActivityButton: {
        alignSelf: 'center',
        marginBottom: 5,
        marginTop: 5,
        marginRight: 10,
        marginLeft: 10,
    },
    swiper:{
        height:Dimensions.get('screen').height/3,
    },
    buttonText: {
        fontSize: 50, 
        color: '#C2185B',
    },
    eventBox: {
        flex: 1,
        alignItems: 'center',
        borderWidth: 2,
        margin: 10,
        borderRadius: 10,
        justifyContent: 'flex-start',
        marginHorizontal: '7.5%',
        width: '85%',
        backgroundColor: '#ffffff',
        borderColor: '#C2185B'
      },
})

export default HomeView