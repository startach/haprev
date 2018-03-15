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
        marginTop: '15%',
        alignItems:'center',
        justifyContent:'center',
      },
      userImage:{
        width:150,
        height:150,
      },
      title:{
        color:'white',
        fontSize: 36,
        fontWeight:'400'
      },
      buttonsContainer: {
        marginTop: 20, 
        marginHorizontal: 36,
        justifyContent: 'center'
      },
      registerButton:{
        width:150,
        padding:10, 
        backgroundColor:'#D81A4C',
        borderWidth:1,
        borderRadius:15,
        alignSelf:'center'
      },
      registerButtonText: {
        color:'white',
        fontSize: 28,
        fontWeight: 'bold',
        textAlign:'center',
      },
});