import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      textAlign: 'center',
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
      backgroundColor: '#898E8C',
      height:'40%',
      width: '90%',
      borderWidth: 2,
      borderRadius:15,
    },
    activityBox: {
      flex: 1,
      alignItems: "center",
      borderBottomColor: '#bbb',
      borderBottomWidth: StyleSheet.hairlineWidth,
      justifyContent: "flex-start",
      height:50,
      flexDirection: "row"
    },
    textBox:{
      fontWeight: 'bold',
      color: '#C2185B',
      textAlign: 'center',
      fontSize: 14,
      marginTop:3,
      marginBottom:3,
      marginRight:2,
    }

  });  