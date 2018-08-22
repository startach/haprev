import React from 'react'
import { View, Text, StyleSheet, Button, Image, Dimensions, ScrollView, ActivityIndicator, TouchableOpacity  } from 'react-native'
import Swiper from 'react-native-swiper'
import EventsListView from '../eventsList/EventsListView'

const HomeView = (props) => {
    const { 
        activityView,
        myNextEvent,
        images,
        processEventsList,
        activityElements

    } = props

    const allActivityButton = (
        <View style={styles.allActivityButton}>
            <TouchableOpacity onPress={activityView}>
                <View style={styles.opacityBtn} >
                    <Text style={{fontSize:14,fontWeight: 'bold',margin:6,color:'#C2185B'}}>ההתנדבויות שלי</Text>
                </View>
            </TouchableOpacity>
        </View>
    )


    return (
        <ScrollView horizontal={false}>
            <View style={styles.container}>
                <View style={styles.eventBox}>
                    <Text style={styles.textCenter}>ההתנדבויות הבאות</Text>
                    <EventsListView
                    processEventsList={processEventsList}
                    activityElements={activityElements}
                    isNextEvents={true}
                    />
                </View>
                <View style={{paddingTop:10}}/>
                <View style={[styles.eventBox,{backgroundColor:'#C2185B'}]}>
                    <Text style={[styles.textCenter,{color:'#FFFFFF'}]}>התנדבות הבאה שלי</Text>
                    <Text style={[styles.textCenter,{color:'#FFFFFF'}]}>{myNextEvent ? (myNextEvent.caption + ' ב-' +myNextEvent.date) : 'לא קיימות התנדבויות'}</Text>
                    {allActivityButton}
                </View>
                <View style={{paddingTop:10}}/>
                <Text style={[styles.textCenter,{marginBottom:5}]}>באנו לשמח, תראו בעצמכם</Text>
                <View style={[styles.box,styles.swiper]}>
                    <Swiper 
                    loadMinimalLoader={<ActivityIndicator size='large' color='#C2185B'/>}  
                    activeDotColor={'#C2185B'}
                    dotColor={'#ffffff'}
                    autoplay
                    autoplayTimeout={4}
                    showsButtons
                    nextButton={<Text style={styles.buttonText}>‹</Text>} 
                    prevButton={<Text style={styles.buttonText}>›</Text>}
                    >
                    <Image style={styles.picture} source={{ uri: images[1] }}/>
                    <Image style={styles.picture} source={{ uri: images[2] }}/>
                    <Image style={styles.picture} source={{ uri: images[3] }}/>
                    <Image style={styles.picture} source={{ uri: images[4] }}/>
                    <Image style={styles.picture} source={{ uri: images[5] }}/>
                    <Image style={styles.picture} source={{ uri: images[6] }}/>
                    <Image style={styles.picture} source={{ uri: images[7] }}/>
                    <Image style={styles.picture} source={{ uri: images[8] }}/>
                    </Swiper>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        flex: 1, 
        paddingTop:15,
    },
    picture: {
        flex: 1,
        width:'100%',
        borderRadius: 8,
    },
    textCenter: {
        textAlign: 'center',
        fontSize: 17,
        padding: 1,
        fontWeight: 'bold',
        alignSelf: 'center',
        color:'#C2185B'
    },
    box: {
        marginBottom: 5,
        marginRight: 20,
        marginLeft: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#C2185B',
        justifyContent: 'flex-start',
    },
    allActivityButton: {
        alignSelf: 'center',
        marginBottom: 5,
        marginTop: 5,
        marginRight: 10,
        marginLeft: 10,
    },
    opacityBtn:{
        backgroundColor:'#FFFFFF',
        flexDirection:'column',
        alignSelf: 'center',
        borderBottomWidth:3,
        borderLeftWidth:2,
        borderColor:'#9f144b',
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
        margin: 5,
        borderRadius: 10,
        justifyContent: 'flex-start',
        marginHorizontal: '5%',
        width: '90%',
        backgroundColor: '#f2f2f2',
        borderColor: '#C2185B',
      },
})

export default HomeView