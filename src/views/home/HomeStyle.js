import { StyleSheet,Dimensions } from "react-native";

export default styles = StyleSheet.create({
  container: {
    flex: 1
  },
  picture: {
    flex: 1,
    width: "100%",
    borderRadius: 1
  },
  textCenter: {
    textAlign: "center",
    fontSize: 17,
    padding: 1,
    fontWeight: "bold",
    color: "#C2185B"
  },
  titleText: {
    fontSize: 14,
    fontWeight: "bold",
    margin: 6,
    color: "#C2185B"
  },
  box: {
    marginHorizontal: 20,
    borderRadius: 3,
    borderWidth: 2,
    borderColor: "#C2185B",
    justifyContent: "flex-start"
  },
  allActivityButton: {
    alignSelf: "center",
    marginRight: 10,
    marginLeft: 10
  },
  opacityBtn: {
    backgroundColor: "#FFFFFF",
    flexDirection: "column",
    alignSelf: "center",
    borderBottomWidth: 3,
    borderLeftWidth: 2,
    borderColor: "#9f144b"
  },
  swiper: {
    height: Dimensions.get("screen").height / 3
  },
  buttonText: {
    fontSize: 50,
    color: "#C2185B"
  },
  eventBox: {
    flex: 1,
    alignItems: "center",
    borderWidth: 2,
    marginTop: 15,
    marginHorizontal: "5%",
    borderRadius: 10,
    justifyContent: "flex-start",
    width: "90%",
    backgroundColor: "#f2f2f2",
    borderColor: "#C2185B"
  },
  imageTitle: {
    color: "#C2185B",
    fontSize: 15,
    fontWeight: "bold",
    position: "absolute",
    textAlign: "center",
    backgroundColor: "#f2f2f2",
    width: "100%",
    opacity: 0.75,
    top: "90%",
    paddingBottom: 1,
  }
});
