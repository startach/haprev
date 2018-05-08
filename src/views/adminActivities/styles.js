import {StyleSheet} from 'react-native';

const  adminActivityStyle =StyleSheet.create( {
    container:{
        flex: 1,
        justifyContent: 'space-around',
    },
    h1:{
        textAlign:'center',
        fontSize:18,
        padding:10,
    },
    h2:{
        textAlign:'center',
        fontSize:16,
        paddingTop:30,
    }
});
const modalActivityStyle = StyleSheet.create( {
    participantItem: {
        marginHorizontal: '10%',
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderTopColor: '#333',
        borderTopWidth: StyleSheet.hairlineWidth,
    },
    img:{
        height: 40,
        width: 40,
        backgroundColor:'#080',
        margin: 5,
    },
    bottomButtons:{
        bottom:0,
    },
    button:{
        margin: 20
    },
    modalContainer: {
        marginTop: "40%",
        justifyContent: 'center',
        alignSelf:'center',        
        backgroundColor: 'grey',
        height:'50%',
        width: '90%',
        borderWidth:2,
        borderRadius:15,
      },
      title: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalButton:{
        width:200,
        margin:20,
        padding:10,
        backgroundColor:'#D81A4C',
        borderRadius:15,
        alignSelf:'center'
      },
      modalButtonText: {
        color:'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign:'center',
      },
    activityName:{
        height:100,
        color:'white'
    }
});
 

const adminActivityListStyle = StyleSheet.create({
    header:{
        margin: 20,
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 100,
    },
    img:{
        height: 60,
        width: 60,
        backgroundColor:'#080',
        marginBottom: 10,
    },
    h1:{
        fontSize:20,
    },
    h2:{
        fontSize:16,
        paddingTop:8,

    },
    plusButton:{
        alignSelf: 'flex-end',
        position: 'absolute',
        bottom: -10,
    },
    activityItemOdd: {
        height:50,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#ccc'
    },
    activityItemEven: {
        height:50,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#ddd'
    }
})

const CreateActivityStyle = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignContent:'center',
        borderWidth:2,
        borderColor:'#D81A4C'
    },
    name: {
        height:100
    },
    button:{
        width:'70%',
        marginTop:10,
        padding:10, 
        backgroundColor:'#D81A4C',
        borderRadius:15,
        alignSelf:'center'
    },
    buttonText: {
        color:'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign:'center',
    },
    inputField:{
        paddingRight: 5,
        paddingLeft: 5,
        marginBottom:15,
        marginTop:8,
        marginRight: 30,
        marginLeft: 30,
        borderColor: 'gray',
        height:38,
        borderWidth:1,
        fontSize: 20,
        backgroundColor: '#F5F5F5'
    },
    untouchableField:{
        paddingTop:7,
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: '#dedede'
      },
    subtitle: {
        fontSize: 22,
        textAlign: 'center',
    },
    dateField:{
        paddingTop:15,        
        paddingBottom:20,
    },
    modalContainer: {
        marginTop: "40%",
        justifyContent: 'center',
        alignSelf:'center',        
        backgroundColor: 'gray',
        height:'35%',
        width: '90%',
        borderWidth:2,
        borderRadius:15,
    },
});

export {
    adminActivityStyle,
    modalActivityStyle,
    adminActivityListStyle,
    CreateActivityStyle
}