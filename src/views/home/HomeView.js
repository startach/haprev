import React from 'react'
import { View, Text, StyleSheet, Image, Dimensions, ScrollView, ActivityIndicator, TouchableOpacity  } from 'react-native'
import Swiper from 'react-native-swiper'
import EventsListView from '../eventsList/EventsListView'
import {AnimatableView,AnimatableText} from '../AnimatableService'

const HomeView = (props) => {
    const { 
        activityView,
        myNextEvent,
        images,
        processEventsList,
        activityElements,
        notFirstTime
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
                <AnimatableView 
                viewStyle={styles.eventBox}
                duration={notFirstTime?1:1500}
                viewContent= { 
                    <View>
                        <AnimatableText 
                        textStyle={styles.textCenter}
                        textContent='ההתנדבויות הבאות'
                        />
                        <EventsListView
                        processEventsList={processEventsList}
                        activityElements={activityElements}
                        isNextEvents={true}
                        />
                    </View>
                }
                />
                <View style={{paddingTop:10}}/>
                <AnimatableView 
                viewStyle={[styles.eventBox,{backgroundColor:'#C2185B',borderColor:'#f2f2f2'}]}
                duration={notFirstTime?1:1250}
                viewContent= { 
                    <View>
                    <AnimatableText 
                    textStyle={[styles.textCenter,{color:'#FFFFFF'}]}
                    textContent='התנדבות הבאה שלי'
                    />
                    <Text style={[styles.textCenter,{color:'#FFFFFF'}]}>{myNextEvent ? (myNextEvent.caption + ' ב-' +myNextEvent.date) : 'לא קיימות התנדבויות'}</Text>
                    {allActivityButton}
                    </View>
                }
                />
                <View style={{paddingTop:10}}/>
                <AnimatableView 
                viewStyle={{}}
                duration={notFirstTime?1:1000}
                viewContent= { 
                <View>
                    <AnimatableText 
                    textStyle={[styles.textCenter,{marginBottom:5}]}
                    textContent='באנו לשמח, תראו בעצמכם'
                    />
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
                            <Image style={styles.picture} source={{ uri: images[0] }}/>
                            <Image style={styles.picture} source={{ uri: images[1] }}/>
                            <Image style={styles.picture} source={{ uri: images[2] }}/>
                            <Image style={styles.picture} source={{ uri: images[3] }}/>
                            <Image style={styles.picture} source={{ uri: images[4] }}/>
                            <Image style={styles.picture} source={{ uri: images[5] }}/>
                            <Image style={styles.picture} source={{ uri: images[6] }}/>
                            <Image style={styles.picture} source={{ uri: images[7] }}/>
                        </Swiper>
                    </View>
                </View>
                }
                />

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