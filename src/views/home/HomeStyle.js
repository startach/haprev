import { StyleSheet, Dimensions } from "react-native";
const { height } = Dimensions.get("screen");

export default (styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    paddingBottom: 20,
    backgroundColor: "#FFF"
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
    marginHorizontal: 10,
    marginVertical: 5,
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
    height: height / 3
  },
  buttonText: {
    fontSize: 50,
    color: "#C2185B"
  },
  eventBox: {
    flex: 1,
    alignItems: "center",
    borderWidth: 2,
    marginVertical: height * .02,
    marginHorizontal: "5%",
    borderRadius: 10,
    width: "90%",
    backgroundColor: "#f2f2f2",
    borderColor: "#C2185B"
  },
  imageContainer: {
    flex: 1
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
    paddingBottom: 1
  }
}));
