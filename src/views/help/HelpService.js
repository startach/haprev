import * as firebase from 'firebase';

export const helpReqHandler = async (first,last,contact,content) => {
        let currDate =new Date().toJSON().slice(0,10);
        let res = await firebase.database().ref('contactUs').child(currDate).push()
            .set({
                name: first + ' ' + last, 
                email_phone: contact,
                content: content
            })
            .then(() => {return 'ok'})
            .catch(error => {console.log('Data could not be saved.',error); return 'err'});
        return res
}