import React, {Component} from "react";
import {FlatList, Text, View, StyleSheet, Linking, ScrollView, TouchableOpacity} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; 
import { Constants } from 'expo';

class SideMenu extends Component {
    constructor(props) {
        super(props);
      } 

    setNavigation({item}){   
        const { navigation } = this.props;
        if (item.nav!="Close" && item.nav!="Facebook_startach" && item.nav !="Facebook_haprev")
            navigation.navigate(item.nav) 
        else if(item.nav=="Facebook_haprev")
            Linking.canOpenURL('fb://page/947461178709459')
            .then((supported) => {
            if (!supported)
                Linking.openURL('http://facebook.com/arevolutionofhappiness/')
            else
                Linking.openURL('fb://page/947461178709459')
            })
            .catch(err => Alert.alert(err)),
                navigation.navigate('DrawerClose');
        else if(item.nav=="Facebook_startach")
        {
            Linking.canOpenURL('fb://page/1216464335058002')
            .then((supported) => { 
            if (!supported)   
                Linking.openURL('http://facebook.com/StartAchCom/')
            else
                Linking.openURL('fb://page/1216464335058002')
            })    
            .catch(err => Alert.alert(err)),
                navigation.navigate('DrawerClose');
        } 
        else
            navigation.navigate('DrawerClose');
    } 

    render() {
        return (
            <ScrollView>
            <View style={styles.statusBar} />
                <View >
                    <FlatList
                    data={[
                        { key:(<Icon name="close" size={34} style={{color:'#D81A4C'}} />), nav:'Close', index:0}, 
                        { key:"דף הבית", nav:'Home', index:1},
                        { key:"חיפוש", nav:'Search', index:2},
                        { key:"צ'אט", nav:'Chat', index:3}, 
                        { key:"מהפכה של שמחה בפייסבוק", nav:'Facebook_haprev', index:4},
                        { key:"סטארטאח בפייסבוק", nav:'Facebook_startach', index:5},
                        { key:"אזור אישי", nav:'MyAccount', index:6},
                        { key:"פרופיל", nav:'Profile', index:7},
                        { key:"אנשי קשר", nav:'Contacts', index:8}, 
                        { key:"עזרה", nav:'Help', index:9}
                    ]}
                    renderItem={({item}) => 
                        <TouchableOpacity 
                        onPress={ () => {this.setNavigation({item})}}
                        style={ item.index%2 ? styles.grayLine : styles.whiteLine}> 
                        <Text style={styles.textStyle}>{item.key}</Text>
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
        height: 50, 
      },
    grayLine: {
        backgroundColor:'#dbdbdb',
        opacity: 0.8,
        height: 50, 
      },  
    textStyle:{
        margin: 13,
        fontSize: 17,
        fontFamily: 'sans-serif', 
    },
  });

export default SideMenu;