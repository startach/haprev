import React, {Component} from 'react';
import {FlatList, Text, View, StyleSheet, Linking, ScrollView, TouchableOpacity, Image} from 'react-native';
import { Constants } from 'expo';
import { connect } from 'react-redux'
import { LinearGradient } from 'expo';

class SideMenu extends Component {
    constructor(props) {
        super(props);
        this.activityScreen = 0;
      } 

    setNavigation({item,index}){   
        this.props.navigation.navigate('DrawerClose');
        this.activityScreen=index;
        this.props.navigation.navigate(item.nav)              
    } 

    facebookNavigation(){
        Linking.canOpenURL('fb://page/947461178709459')
            .then((supported) => {
            if (!supported)
                Linking.openURL('http://facebook.com/arevolutionofhappiness/')
            else
                Linking.openURL('fb://page/947461178709459')
            })
            .catch(err => alert(err))
    }

    instagramNavigation(){
        Linking.canOpenURL('intent://instagram.com/_u/revolution_of_happiness')
            .then((supported) => {
            if (!supported)
                Linking.openURL('http://instagram.com/revolution_of_happiness/')
            else
                Linking.openURL('intent://instagram.com/_u/revolution_of_happiness')
            })
            .catch(err => alert(err))
    }

    websiteNavigation(){
        Linking.canOpenURL('https://www.startach.org.il/')
            .then(() => {Linking.openURL('https://www.startach.org.il/')})
            .catch(err => alert(err));
        
    }

    getMenuLineStyle(item,index){
        const key = item.key;
        if(key == 'ממשק רכזים' && !this.props.coordinator) 
            return styles.displayNone
        else if(key == 'פרופיל')
            return styles.profile
        else if(index%2)
            return styles.grayLine 
        else 
            return styles.whiteLine
    }

    getSocialMediaIcon=(item,index)=>(
        <TouchableOpacity key={index} onPress={()=>item.action()}>
            <Image style={{height:item.height,width: 50}} source={item.imgPath} resizeMode="contain"/>
        </TouchableOpacity>
    )
        

    getMenuByKey(item,index){
        switch (item.key) {
            case 'פרופיל':
                return <View>
                            <LinearGradient colors={['#e94989','#e31c6c', '#C2185B', '#9f144b']} start={[.5, 0]} end={[.75, .85]}>
                                <TouchableOpacity
                                onPress={ () => this.setNavigation({item,index})}
                                style={this.getMenuLineStyle(item,index)}>
                                {this.props.avatarUrl ? 
                                    <Image style={styles.userImage} source={{ uri: this.props.avatarUrl }}/>
                                    : 
                                    <Image
                                        style={styles.emptyUserImage}
                                        source={require('../images/emptyUserIcon.png')}
                                    />
                                }
                                    <Text style={styles.profileText}>{this.props.fullName}</Text>
                                </TouchableOpacity>
                                <FlatList
                                    style={styles.socialMedia}
                                    data={[
                                        { action: this.facebookNavigation, imgPath: require('../images/FacebookLogo.png'), height: 30},
                                        { action: this.websiteNavigation, imgPath: require('../images/STARTACH.png'), height: 33},
                                        { action: this.instagramNavigation, imgPath: require('../images/InstagramLogo.png'), height: 30},
                                    ]}
                                    renderItem={({item,index}) => this.getSocialMediaIcon(item,index)}
                                    keyExtractor={(item,index) => index.toString()}
                                />
                            </LinearGradient>
                        </View>
            default:
                return <TouchableOpacity
                        onPress={ () => this.setNavigation({item,index})}
                        style={this.getMenuLineStyle(item,index)}>
                            <Text style={[styles.textStyle,this.activityScreen===index ? {color:'#D81A4C'} : null]}>{item.key}</Text>
                        </TouchableOpacity>
        }
    }

    render() {
        return (
            <ScrollView>
            <View style={styles.statusBar} />
                <View>
                    <FlatList
                    data={[
                        { key:'פרופיל', nav:'ProfileRoute'},
                        { key:'מסך הבית', nav:'HomeRoute'},
                        { key:'רישום להתנדבות', nav:'InstitutesRoute'},
                        { key:'התנדבויות שלי', nav:'ActivitiesRoute'},
                        { key:'אנשי קשר', nav:'ContactsRoute'}, 
                        { key:'היסטוריית התנדבויות', nav:'EventsListRoute'},
                        { key:'עזרה', nav:'HelpRoute'},
                        { key:'אודות', nav:'AboutUsRoute'},
                        { key:'ממשק רכזים', nav:'ActivitiesAdminRoute'},
                    ]}
                    renderItem={({item,index}) => this.getMenuByKey(item,index)}
                    />
                </View>
            </ScrollView>
        );
  }
}

const styles = StyleSheet.create({
    statusBar: {
      backgroundColor: '#C2185B', 
      height: Constants.statusBarHeight, 
    },
    whiteLine: {
        backgroundColor:'#ffffff',
        opacity: 0.85,
        height: 50,
        alignItems: 'flex-start',
    },
    grayLine: {
        backgroundColor:'#dbdbdb',
        opacity: 0.85,
        height: 50,
        alignItems: 'flex-start',
    },
    displayNone:{
        display:"none"
    },
    profile:{
        paddingVertical:12,
        alignItems:"center"
    },
    profileText:{
        fontSize: 18,
        color: "#ffffff",
        fontWeight: "bold",
        textAlign: "center"
    },
    socialMedia:{
        borderTopRightRadius: 35,
        borderTopLeftRadius: 35,
        backgroundColor:'#9f144b',
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        paddingTop: 7,
        paddingBottom:5,
    },
    textStyle:{
        margin: 13,
        fontSize: 18,
    },
    emptyUserImage:{
        width:85,
        height:85,
        marginBottom:5,
    },
    userImage:{
        width:85,
        height:85,
        borderRadius:85/2,
        borderWidth:1,
        borderColor: '#ffffff',
        marginBottom:5,
    },
  });

const mapStateToProps = state =>{
    return ({
            avatarUrl:state.user.user.avatarUrl,
            fullName: state.user.user.first + ' ' + state.user.user.last
        })
    }

export default connect(mapStateToProps)(SideMenu)