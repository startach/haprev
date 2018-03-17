import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: "center",
    },
    titlesContainer: {
      paddingTop: 15,
      marginBottom: 18 ,
      marginTop: 18 ,
      justifyContent: 'center',
      alignItems: 'center',
    }, 
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 22,
      textAlign: 'center',
    },
    inputField:{
      paddingRight: 5,
      paddingLeft: 5,
      marginBottom:15,
      marginTop:8,
      marginRight: 30,
      marginLeft: 30,
      borderColor: 'gray',
      height: 125,
      borderWidth:1,
      fontSize: 18,
      backgroundColor: '#F5F5F5'
    },
    untouchableField:{
      height:38,
      paddingTop:7,
      alignItems: 'center',
      textAlign: 'center',
    },
    errorField: {
      borderWidth : 2,
      borderColor:'darkred' 
    },
    errorMessage:{
      color:'darkred',
      fontSize:14,
      height:16,
      alignSelf:'center'
    },
    button:{
      width:150,
      marginTop:20,
      padding:10, 
      backgroundColor:'#D81A4C',
      borderRadius:15,
      alignSelf:'center'
    },
    buttonText: {
      color:'white',
      fontSize: 28,
      fontWeight: 'bold',
      textAlign:'center',
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
  });  