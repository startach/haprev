import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    backgroundColor: '#ffffff',
    width: 350,
  },
  image: {
    height: 220,
  },
  name: {
    color: '#2c2c2c',
    fontFamily: 'sans-serif',
    fontSize: 22,
    fontWeight: '400',
  },
  city: {
    color: '#7b7b7b',
    fontFamily: 'sans-serif',
    fontSize: 18,
    fontWeight: '400',
  },
});

export default styles;
