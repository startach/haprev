import React from 'react'
import {View, Text, FlatList, ScrollView, TouchableOpacity, ActivityIndicator, Linking} from 'react-native'
import styles from './ContactViewStyle'
import { FontAwesome } from '@expo/vector-icons';
import { connect } from 'react-redux'
import {getContacts} from '../../store/modules/contacts'

class ContactItem extends React.Component{
    renderText = (text)=> {
        if (text.length > 16 )
            return text.slice(0, 13)+'...'
        return text
    }

    callToCoordinator=(phone)=>{
        try{
            if(phone)
                Linking.openURL('tel:'+phone)
            else
                alert('מספר הטלפון לא זמין במערכת')
            }
        catch(e){
            alert('מספר הטלפון לא זמין במערכת')
        }
    }
    
    render() {
    const {contact,index} = this.props
        return (
            <View style={[styles.activityBox,(index%2 === 0) ? {backgroundColor:'#F5F5F1'} : {backgroundColor:'#F0EDE0'}]}>
                <Text style={[styles.textBox,{width: '20%'}]}>{contact.name}</Text>
                <Text style={styles.textBox}>|</Text>
                <Text style={[styles.textBox,{width: '20%'}]}>{contact.role}</Text>
                <Text style={styles.textBox}>|</Text>
                <Text style={[styles.textBox,{width: '22%'}]}>{contact.instituteName}</Text>
                <Text style={styles.textBox}>|</Text>
                <Text style={[styles.textBox,{width: '20%'}]}>{contact.city}</Text>
                <TouchableOpacity onPress={() => this.callToCoordinator(contact.phone)}>                
                    <FontAwesome name='phone-square' size={27} color={'#009B77'} style={{paddingBottom:5,paddingTop:10}}/>
                </TouchableOpacity>
            </View>
        )
    }
}

class RegionItem extends React.Component{
    render() {
    const {region,contactsOfRegion} = this.props
        return (
            <View>
                <Text style={styles.region}>{region}</Text>
                <FlatList
                data={contactsOfRegion}
                renderItem={({item, index}) => <ContactItem contact={item} index={index}/>}
                keyExtractor={(item) => item.phone}
                />
            </View>
        )
    }
}

class ContactsView extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            contacts: this.props.contacts,
            contactsByRegion:this.props.contactsByRegion,
            regions:this.props.regions,
        }
    }
    async componentWillMount() {
        if(!this.props.contacts){
            await this.props.getContacts()
            this.setState({
                contacts:this.props.contacts,
                contactsByRegion:this.props.contactsByRegion,
                regions:this.props.regions
            })
        }
    }
    render() {
        return(
            <View >
                { this.state.contacts ?
                <ScrollView horizontal={false}>
                    <FlatList
                    data={this.state.regions}
                    renderItem={({item, index}) => <RegionItem region={item} contactsOfRegion={this.state.contactsByRegion[item]}/>}
                    keyExtractor={(item) => item}
                    />
                </ScrollView>  
                :
                <View style={{paddingTop:50,flex:1}}>
                    <ActivityIndicator size='large' color='#C2185B'/>
                </View>
                }
            </View>
        )
    }
}

const mapStateToProps = state =>{
    return ({
            contacts: state.contacts.contacts,
            regions: state.contacts.regions,
            contactsByRegion: state.contacts.contactsByRegion,
        })
    }

export default connect(mapStateToProps,{getContacts})(ContactsView)