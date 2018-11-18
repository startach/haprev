import React, {Component} from 'react';
import {FlatList, Text, View, StyleSheet, Linking, ScrollView, TouchableOpacity} from 'react-native';
import { Constants } from 'expo';

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

    render() {
        return (
            <ScrollView>
            <View style={styles.statusBar} />
                <View>
                    <FlatList
                    data={[
                        { key:'מסך הבית', nav:'HomeRoute'},
                        { key:'פרופיל', nav:'ProfileRoute'},
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
                            onPress={ () => {this.setNavigation({item,index})}}
                            style={ 
                                item.key == 'ממשק רכזים' && !this.props.coordinator ? {display:"none"} :
                                index%2 ? styles.grayLine : styles.whiteLine
                                
                                }>
                            <Text style={[styles.textStyle,this.activityScreen===index ? {color: '#D81A4C'}:null]}>{item.key}</Text>
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
    },
  });

export default SideMenu;