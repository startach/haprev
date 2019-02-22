import { StyleSheet, Dimensions } from "react-native";
const { height } = Dimensions.get('screen');

const adminActivityStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around"
  },
  h1: {
    textAlign: "center",
    fontSize: 20,
    padding: 5,
    fontWeight: "bold"
  },
  h2: {
    textAlign: "center",
    fontSize: 18,
    padding: 5,
    fontWeight: "bold"
  },
  h3: {
    textAlign: "center",
    fontSize: 16
  },
  userImageList: {
    margin: 5,
    marginBottom: 3,
    width: 35,
    height: 35,
    borderRadius: 35 / 2
  },
  withoutImgList: {
    margin: 5,
    marginBottom: 3,
    color: "#B4B7BA"
  },
  phoneIcon: {
    margin: 5,
    marginBottom: 3,
    paddingLeft: 15,
    color: "#009B77"
  },
  cancelButton: {
    height: 60,
    backgroundColor: "#E94B3C",
    width: "100%",
    justifyContent: "center",
    flexDirection: "row",
    alignSelf: "center",
    borderWidth:1,
    borderColor:'#ffffff',
  },
  cancelIcon: {
    alignSelf: "center",
    color: '#fff',
    marginLeft: 10,
    marginRight: 10
  },
  cancelText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: "bold",
    alignSelf: "center",
    alignItems: "center"
  },
  participantText: {
    fontSize: 18,
    flexDirection: "column",
    alignSelf: "center"
  },
  coordinatorLine: {
    backgroundColor: "#e6e6e6",
    borderBottomWidth: 2
  },
  eventBox: {
    flex: 1,
    alignItems: "center",
    borderWidth: 2,
    margin: 10,
    borderRadius: 10,
    justifyContent: "flex-start",
    marginHorizontal: "10%",
    width: "80%"
  },
  inputField: {
    paddingRight: 5,
    paddingLeft: 5,
    marginBottom: 20,
    marginTop: 5,
    marginRight: 30,
    marginLeft: 30,
    borderColor: "black",
    height: 38,
    borderWidth: 1,
    fontSize: 16,
    backgroundColor: "#F5F5F5"
  },
  inputFieldExtraParticipants: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: "center",
    borderColor: "black",
    height: 38,
    width: '50%',
    borderWidth: 1,
    fontSize: 16,
    backgroundColor: "#F5F5F5"
  }
});
const modalActivityStyle = StyleSheet.create({
  participantItem: {
    marginHorizontal: "10%",
    width: "80%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderTopColor: "#333",
    borderTopWidth: StyleSheet.hairlineWidth
  },
  img: {
    height: 40,
    width: 40,
    backgroundColor: "#080",
    margin: 5
  },
  bottom: {
    flex: 0,
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  bottomButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    margin: 20
  },
  registrationModalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: "center",
    marginTop: height * 0.15,
    backgroundColor: '#c2185b',
    height: height * 0.4,
    width: "90%",
    borderRadius: 10,
  },
  modalContainer: {
    marginTop: height * 0.2,
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: '#c2185b',
    height: height * 0.4,
    width: "90%",
    borderWidth: 2,
    borderRadius: 10
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: 20
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: 'flex-end'
  },
  extraParticipantsContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    alignSelf: "center",
    width: "100%"
  },
  modalButton: {
    margin: 5,
    backgroundColor: "#E94B3C",
    borderRadius: 15,
    alignItems: "center"
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: "bold",
    margin: 10
  },
  modalRegisterButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: "bold",
    margin: 15
  },
  activityName: {
    height: 100,
    color: '#fff'
  }
});

const adminActivityListStyle = StyleSheet.create({
  header: {
    margin: 20,
    justifyContent: "space-around",
    alignItems: "center",
    height: 100
  },
  userImage: {
    marginBottom: 10,
    borderRadius: 65 / 2,
    width: 65,
    height: 65
  },
  withoutImg: {
    marginBottom: 10,
    color: "#B4B7BA"
  },
  h1: {
    fontSize: 20
  },
  h2: {
    fontSize: 16,
    paddingTop: 8
  },
  plusButton: {
    alignSelf: "flex-end",
    position: "absolute",
    bottom: -10
  },
  syncButton: {
    alignSelf: "flex-start",
    position: "absolute",
    bottom: -10
  },
  activityItemOdd: {
    height: 50,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#ccc"
  },
  activityItemEven: {
    height: 50,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#ddd"
  },
  dateText:{
    width: '25%',
    paddingRight: 2,
    textAlign: 'left',
  },
  captionText:{
    width: '35%',
    paddingRight: 2,
    textAlign: 'left',
  },
  participantsText:{
    width: '25%',
    paddingRight: 2,
    textAlign: 'left',
  },
});

const CreateActivityStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    borderWidth: 2,
    borderColor: "#D81A4C",
  },
  scrollContainer:{
    paddingVertical: 20
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
    color: '#fff',
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
  modalContainer: {
    marginTop: height * 0.25,
    alignSelf: "center",
    backgroundColor: '#c2185b',
    height: "45%",
    width: "90%",
    borderWidth: 2,
    borderRadius: 10,
  }
});

export {
  adminActivityStyle,
  modalActivityStyle,
  adminActivityListStyle,
  CreateActivityStyle
};