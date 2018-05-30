import { StyleSheet } from "react-native";

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
    borderRadius: 100
  },
  withoutImgList: {
    margin: 5,
    marginBottom: 3,
    color: "grey"
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
    marginTop: 20
  },
  cancelIcon: {
    alignSelf: "center",
    color: "white",
    marginLeft: 10,
    marginRight: 10
  },
  cancelText: {
    color: "white",
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
  bottomButtons: {
    bottom: 0
  },
  button: {
    margin: 20
  },
  modalContainer: {
    marginTop: "50%",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "grey",
    height: "30%",
    width: "90%",
    borderWidth: 2,
    borderRadius: 15
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
    alignSelf: "center"
  },
  modalButton: {
    margin: 5,
    backgroundColor: "#E94B3C",
    borderRadius: 15,
    alignItems: "center"
  },
  modalButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    margin: 10
  },
  modalRegistarButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    margin: 15
  },
  activityName: {
    height: 100,
    color: "white"
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
    borderRadius: 100,
    width: 65,
    height: 65
  },
  withoutImg: {
    marginBottom: 10,
    color: "grey"
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
  }
});

const CreateActivityStyle = StyleSheet.create({
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
    borderColor: "gray",
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
    marginTop: "40%",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "gray",
    height: "35%",
    width: "90%",
    borderWidth: 2,
    borderRadius: 15
  }
});

export {
  adminActivityStyle,
  modalActivityStyle,
  adminActivityListStyle,
  CreateActivityStyle
};