import React from 'react'
import { View, Text, StyleSheet, Image, Dimensions, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native'
import Swiper from 'react-native-swiper'
import EventsListView from '../eventsList/EventsListView'
import {AnimatableView,AnimatableText} from '../AnimatableService'
import { WebBrowser } from 'expo';

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
                    <Text style={styles.titleText}>ההתנדבויות שלי</Text>
                </View>
            </TouchableOpacity>
        </View>
    )

    const swiperImages = (images) => (
        images.map((img,i)=>
        <TouchableOpacity 
        key={i} 
        style={styles.container}
        onPress={async() => {await WebBrowser.openBrowserAsync(img.imgUrl)}}
        >
            <Image style={styles.picture} source={{uri:img.imgUrl}}/>
            <Text style={styles.imageTitle}>{img.title}</Text>
        </TouchableOpacity>
        )
    )

    return (
        <ScrollView horizontal={false}>
            <View style={styles.container}>
                <AnimatableView 
                viewStyle={[styles.eventBox,{marginTop:13}]}
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
                <AnimatableView 
                viewStyle={[styles.eventBox,{backgroundColor:'#C2185B',borderColor:'#f2f2f2',paddingBottom:1}]}
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
                <AnimatableView 
                duration={notFirstTime?1:1000}
                viewContent= { 
                    <View>
                        <AnimatableText 
                        textStyle={[styles.textCenter,{paddingTop:5, paddingBottom:3}]}
                        textContent='באנו לשמח, תראו בעצמכם'
                        />
                        <View style={[styles.box, styles.swiper]}>
                        <Swiper
                        autoplay
                        autoplayTimeout={3.5}
                        loadMinimalLoader={<ActivityIndicator size='large' color='#C2185B'/>}  
                        activeDotColor={'#C2185B'}
                        dotColor={'#ffffff'}
                        showsButtons
                        nextButton={<Text style={styles.buttonText}>‹</Text>} 
                        prevButton={<Text style={styles.buttonText}>›</Text>}
                            >
                                {swiperImages(images)}
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
        flex: 1, 
    },
    picture: {
        flex: 1,
        width:'100%',
        borderRadius: 1,
    },
    textCenter: {
        textAlign: 'center',
        fontSize: 17,
        padding: 1,
        fontWeight: 'bold',
        color:'#C2185B'
    },
    titleText: {
        fontSize:14,
        fontWeight: 'bold',
        margin:6,
        color:'#C2185B',
    },
    box: {
        marginHorizontal:20,
        borderRadius: 3,
        borderWidth: 2,
        borderColor: '#C2185B',
        justifyContent: 'flex-start',
    },
    allActivityButton: {
        alignSelf: 'center',
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
        marginTop: 15,
        marginHorizontal: '5%',
        borderRadius: 10,
        justifyContent: 'flex-start',
        width: '90%',
        backgroundColor: '#f2f2f2',
        borderColor: '#C2185B',
      },
    imageTitle:{
        color: '#C2185B',
        fontSize: 15,
        fontWeight: 'bold',
        position: "absolute",
        textAlign:'center',
        backgroundColor: '#f2f2f2',
        width: '100%',
        opacity:0.6,
        top:"90%",
    },
})

export default HomeView