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
    },
    plusButton:{
        alignSelf: 'flex-end',
        position: 'absolute',
        bottom: -10
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

export {
    adminActivityStyle,
    modalActivityStyle,
    adminActivityListStyle
}