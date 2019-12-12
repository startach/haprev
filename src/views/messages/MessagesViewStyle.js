import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  activityBox: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 80
  },
  textBox: {
    fontWeight: 'bold',
    color: '#a9012b',
    textAlign: 'center',
    fontSize: 14,
    marginRight: 1
  },
  checkIcon: {
    paddingBottom: 5,
    paddingTop: 10,
    marginLeft: 10
  }
})
