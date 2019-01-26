import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    width: 190,
    margin:1,
  },
  InstituteCard: {
    backgroundColor:'#C2185B',
    borderRadius: 15,
  },
  image: {
    height:130,
  },
  name: {
    paddingHorizontal:12,
    alignSelf: 'flex-start',
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '200',
  },
  city: {
    paddingHorizontal:12,
    paddingBottom: 1,
    alignSelf: 'flex-start',
    color: '#ffe6f3',
    fontSize: 16,
    fontWeight: '100',
  },
});

export default styles;
