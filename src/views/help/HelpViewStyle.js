import { StyleSheet, Dimensions } from 'react-native'
const { height } = Dimensions.get('screen')

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  titlesContainer: {
    paddingTop: 15,
    marginBottom: 18,
    marginTop: 18,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 22,
    textAlign: 'center'
  },
  inputField: {
    paddingRight: 5,
    paddingLeft: 5,
    marginBottom: 15,
    marginTop: 8,
    marginRight: 30,
    marginLeft: 30,
    borderColor: '#B4B7BA',
    height: 125,
    borderWidth: 1,
    fontSize: 18,
    backgroundColor: '#F5F5F5'
  },
  untouchableField: {
    height: 38,
    paddingTop: 7,
    alignItems: 'center',
    textAlign: 'center'
  },
  button: {
    width: 150,
    marginTop: 20,
    padding: 10,
    backgroundColor: '#D81A4C',
    borderRadius: 15,
    alignSelf: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modalContainer: {
    marginTop: height * 0.25,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#c2185b',
    height: '40%',
    width: '90%',
    borderRadius: 10
  }
})
