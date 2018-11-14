import { StyleSheet } from 'react-native';

export default StyleSheet.create({
      topContainer:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      innerContainer:{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0, 
        justifyContent: 'center',
        alignItems: 'center',
      },
      background:{
        position: 'absolute',
        width: '100%',
        height: '100%'
      },
      userView:{
        marginTop: 5,
        alignItems:'center',
        justifyContent:'center',
      },
      emptyUserImage:{
        width:150,
        height:150,   
      },
      userImage:{
        marginTop:15,
        width:135,
        height:135,
        borderRadius:100,
        borderWidth:1,
        borderColor: 'white'
      },
      title:{
        color:'white',
        fontSize: 32,
        fontWeight:'400',
        marginTop: 5,
      },
      signIn:{
        color:'#D81A4C',
        fontSize: 15,
        fontWeight:'400',
        borderBottomWidth:0.5,
        borderColor:'#D81A4C',
      },
      buttonsContainer: {
        marginTop: 15,
        marginBottom: 10,
        marginHorizontal: 36,
        justifyContent: 'center'
      },
      registerButton:{
        width:130,
        padding:7, 
        backgroundColor:'#D81A4C',
        borderWidth:1,
        borderRadius:10,
        alignSelf:'center'
      },
      registerButtonText: {
        color:'white',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign:'center',
      },
});