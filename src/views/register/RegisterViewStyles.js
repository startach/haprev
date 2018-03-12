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
        top: 30,
        position: 'absolute',
        width: '100%',
        height: '100%'
      },
      userView:{
        marginTop: 24,
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
      registerButton: {
        color: 'black',
        justifyContent: 'center',
        fontSize: 26,
        fontWeight: '400',
        marginTop: 24,
        height: 60,
        borderRadius: 30,
        width: '100%',
      },
      buttonsContainer: {
        marginTop: 36, 
        marginHorizontal: 36,
        justifyContent: 'center'
      },
});