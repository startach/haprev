import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    borderWidth: 2,
    borderColor: "#D81A4C"
  },
  name: {
    height: 100
  },
  button: {
    width: "70%",
    marginTop: 10,
    padding: 10,
    backgroundColor: "#D81A4C",
    borderRadius: 15,
    alignSelf: "center"
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center"
  },
  inputField: {
    paddingRight: 5,
    paddingLeft: 5,
    marginBottom: 15,
    marginTop: 8,
    marginRight: 30,
    marginLeft: 30,
    borderColor: "#B4B7BA",
    height: 38,
    borderWidth: 1,
    fontSize: 20,
    backgroundColor: "#F5F5F5"
  },
  untouchableField: {
    paddingTop: 7,
    alignItems: "center",
    textAlign: "center",
    backgroundColor: "#dedede"
  },
  subtitle: {
    fontSize: 22,
    textAlign: "center"
  },
  dateField: {
    paddingTop: 15,
    paddingBottom: 20
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
  },
  boxDetails:{
    backgroundColor:'#C2185B',
    height:'100%',
    flexDirection: 'column'
  },
  textDetails:{
    padding:10,
    margin:10,
    fontSize:16,
    color:'#FFFFFF',
  },
  rowLine:{
    flexDirection:'row',
    borderBottomColor: 'white',
    borderBottomWidth: 0.5,
  },
  deleteLine:{
    borderWidth:1,
    borderBottomWidth:1,
    borderColor: 'white',
    backgroundColor:'#9f144b',
  },
  modalContainer: {
    marginTop: "30%",
    marginBottom: "30%",
    justifyContent: 'center',
    alignSelf:'center',        
    backgroundColor: '#B4B7BA',
    width: '70%',
    borderWidth:2,
    borderRadius:15,
  },
  participantItem: {
    marginHorizontal: "17.5%",
    width: "75%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderTopColor: "#333",
    borderTopWidth: StyleSheet.hairlineWidth
  },
  userImageList: {
    margin: 5,
    marginBottom: 3,
    width: 30,
    height: 30,
    borderRadius: 100
  },
  withoutImgList: {
    margin: 5,
    marginBottom: 3,
    color: "#ffffff"
  },
  phoneIcon: {
    margin: 5,
    marginBottom: 3,
    paddingLeft: 20,
    color:'#009B77'
  },
  participantText: {
    fontSize: 16,
    flexDirection: "column",
    alignSelf: "center",
    color:'#ffffff',
  },
});  