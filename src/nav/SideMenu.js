import React, {Component} from 'react';
import {FlatList, Text, View, StyleSheet, Linking, ScrollView, TouchableOpacity, Image} from 'react-native';
import { Constants } from 'expo';
import { connect } from 'react-redux'

class SideMenu extends Component {
    constructor(props) {
        super(props);
        this.activityScreen = 0;
      } 

    setNavigation({item,index}){   
        const { navigation } = this.props;
        if(item.nav=='Facebook_haprev'){
            Linking.canOpenURL('fb://page/947461178709459')
            .then((supported) => {
            if (!supported)
                Linking.openURL('http://facebook.com/arevolutionofhappiness/')
            else
                Linking.openURL('fb://page/947461178709459')
            })
            .catch(err => Alert.alert(err)),
                navigation.navigate('DrawerClose');
        }
        else if(item.nav=='Startach_Web'){
            Linking.canOpenURL('https://www.startach.org.il/')
            .then(() => {Linking.openURL('https://www.startach.org.il/')})    
            .catch(err => Alert.alert(err)),
                navigation.navigate('DrawerClose');
        } 
        else{
            navigation.navigate('DrawerClose');
            this.activityScreen=index;
            navigation.navigate(item.nav)           
        }      
    } 

    getMenuLineStyle(key,index){
        if(key == 'ממשק רכזים' && !this.props.coordinator) 
            return styles.displayNone
        else if(key == 'פרופיל')
            return styles.profile
        else if(index%2)
            return styles.grayLine 
        else 
            return styles.whiteLine
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
                        { key:'היסטוריית התנדבויות', nav:'EventsListRoute'},
                        { key:'התנדבויות שלי', nav:'ActivitiesRoute'},
                        { key:'אנשי קשר', nav:'ContactsRoute'}, 
                        { key:'חפשו אותנו בפייסבוק', nav:'Facebook_haprev'},
                        { key:'סטארטאח', nav:'Startach_Web'},
                        { key:'אודות', nav:'AboutUsRoute'},
                        { key:'עזרה', nav:'HelpRoute'},
                        { key:'ממשק רכזים', nav:'ActivitiesAdminRoute'},
                    ]}
                    renderItem={({item,index}) =>
                        <TouchableOpacity
                            onPress={ () => this.setNavigation({item,index})}
                            style={this.getMenuLineStyle(item.key,index)}>
                                {
                                    item.key != 'פרופיל' ?
                                    <Text style={[styles.textStyle,this.activityScreen===index ? {color: '#D81A4C'}:null]}>{item.key}</Text>
                                    :
                                    <View>
                                    {this.props.avatarUrl ? 
                                        <Image style={styles.userImage} source={{ uri: this.props.avatarUrl }} />
                                        : 
                                        <Image
                                            style={styles.emptyUserImage}
                                            source={require('../images/emptyUserIcon.png')}
                                        />
                                    }
                                        <Text style={styles.profileText}>{this.props.fullName}</Text>
                                    </View>
                                }
                        </TouchableOpacity>
                    }
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
        opacity: 0.8,
        height: 52,
    },
    grayLine: {
        backgroundColor:'#dbdbdb',
        opacity: 0.8,
        height: 52,
    },
    displayNone:{
        display:"none"
    },
    profile:{
        paddingVertical:13,
        backgroundColor:'#C2185B',
        alignItems:"center"
    },
    profileText:{
        fontSize: 18,
        color: "#ffffff",
        fontWeight: "bold",
        textAlign: "center"
    },
    textStyle:{
        margin: 13,
        fontSize: 18,
    },
    emptyUserImage:{
        width:80,
        height:80,   
    },
    userImage:{
        marginBottom:3,
        width:80,
        height:80,
        borderRadius:50,
        borderWidth:1,
        borderColor: '#ffffff'
    },
  });

const mapStateToProps = state =>{
    return ({
            avatarUrl:state.user.user.avatarUrl,
            fullName: state.user.user.first + ' ' + state.user.user.last
        })
    }

export default connect(mapStateToProps)(SideMenu)