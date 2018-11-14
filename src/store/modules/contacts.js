import * as firebase from 'firebase';
import map from 'lodash/map';
import groupBy from 'lodash/groupBy';

const RESPONSE_CONTACTS = 'haprev/events/RESPONSE_CONTACTS';
const initalState = {
  contacts: null,
  regions: null,
  contactsByRegion: null,
};

export default (state = initalState, action = {}) => {
  switch (action.type) {
    case RESPONSE_CONTACTS:
        return { ...state,
            contacts: action.contacts, 
            regions: action.regions, 
            contactsByRegion: action.contactsByRegion 
        }
    default:
        return state;
  }
};

const contactsRes = (contacts,regions,contactsByRegion) => {
    return ({
        type: RESPONSE_CONTACTS,
        contacts:contacts,
        regions: regions,
        contactsByRegion:contactsByRegion
    })
}

export const getContacts = () => async (dispatch) =>{
    await firebase.database().ref('contacts').once('value', 
        snapshot =>{
            contacts = snapshot.val()
            contactsArray = Object.keys(contacts).map(key => {return contacts[key]})
            contactsByRegion = []
            regions = []
            contactsByRegion = groupBy(contactsArray, 'region')
            const res = map(contactsByRegion, (contactInRegion, region) => {
                 regions.push(region)
            })
            dispatch(contactsRes(contactsArray,regions,contactsByRegion))
        })
        .then(() => {})
        .catch(error => {console.log('Error', error)})
}

export const addContact = async(contact) =>{
    // contact = {
    //     name: 'נהוראי',
    //     instituteId: 0,
    //     instituteName: 'שערי צדק',
    //     role: 'רכז ארצי',
    //     phone: "0587804050",
    //     city: 'ירושלים',
    //     region: 'ירושלים'
    // }
    await firebase.database().ref('contacts').push().set(contact)
    .then(() => {})
    .catch(error => {console.log('Data could not be saved.',error); res = 'err'});
}