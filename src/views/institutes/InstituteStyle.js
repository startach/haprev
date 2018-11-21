import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    width: 190,
    margin:1,
  },
  image: {
    height:130,
  },
  name: {
    paddingRight:10,
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '200',
  },
  city: {
    paddingRight:10,
    color: '#ffe6f3',
    fontSize: 16,
    fontWeight: '100',
  },
  beckText:{
    backgroundColor:'#C2185B',
    borderRadius: 15,
  },
});

export default styles;
