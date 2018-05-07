import React, {Component} from "react";
import {FlatList, Text, View, StyleSheet, Linking, ScrollView, TouchableOpacity} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; 
import { Constants } from 'expo';

class SideMenu extends Component {
    constructor(props) {
        super(props);
        this.activityScreen = 0;
      } 

    setNavigation({item}){   
        const { navigation } = this.props;
        if(item.nav=="Facebook_haprev"){
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
        else if(item.nav=="Startach_Web"){
            Linking.canOpenURL('https://www.startach.org.il/')
            .then(() => {Linking.openURL('https://www.startach.org.il/')})    
            .catch(err => Alert.alert(err)),
                navigation.navigate('DrawerClose');
        } 
        else{
            navigation.navigate('DrawerClose');
            this.activityScreen=item.index;
            navigation.navigate(item.nav)           
        }      
    } 

    render() {
        return (
            <ScrollView>
            <View style={styles.statusBar} />
                <View >
                    <FlatList
                    data={[
                        { key:"מסך הבית", nav:'Home', index:0},
                        { key:"רישום להתנדבות", nav:'Institutes', index:1},
                        { key:"התנדבויות שלי", nav:'Activities', index:2}, 
                        { key:"ממשק רכזים", nav:'AdminActivities', index:3}, 
                        { key:"אנשי קשר", nav:'Contacts', index:4}, 
                        { key:"אודות", nav:'AboutUs', index:5},
                        { key:"חפשו אותנו בפייסבוק", nav:'Facebook_haprev', index:6},
                        { key:"סטארטאח", nav:'Startach_Web', index:7},
                        { key:"פרופיל", nav:'Profile', index:8},
                        { key:"עזרה", nav:'Help', index:9}
                    ]}
                    renderItem={({item}) => 
                        <TouchableOpacity 
                            onPress={ () => {this.setNavigation({item})}}
                            style={item.index%2 ? styles.grayLine : styles.whiteLine}> 
                            <Text style={[styles.textStyle,this.props.activeItemKey===item.nav ? {color: "#D81A4C"}:null]}>{item.key}</Text>
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
      backgroundColor: "#C2185B", 
      height: Constants.statusBarHeight, 
    },
    whiteLine: {
        backgroundColor:'#ffffff',
        opacity: 0.8,
        height: 54,
      },
    grayLine: {
        backgroundColor:'#dbdbdb',
        opacity: 0.8,
        height: 54,
      },  
    textStyle:{
        margin: 13,
        fontSize: 18,
        fontFamily: 'sans-serif', 
    },
  });

export default SideMenu;