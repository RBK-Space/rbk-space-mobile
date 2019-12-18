import { StyleSheet } from "react-native";
import styleIndex from "./index";
export default StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: styleIndex.Colors.primary_color,
    alignItems: "center",
    justifyContent: "center"
  },
  loginContainer: {
    flex: 1,
    backgroundColor: styleIndex.Colors.white,
    width: "100%",
    justifyContent: "center"
  },
  ImageIconStyle: {
    padding: 10,
    margin: 5,
    height: 30,
    width: 30,
    resizeMode: "stretch"
  },

  loginButton: {},
  post_container: {
    flex: 1,
    padding: 12,
    width: "100%",
    justifyContent: "flex-start"
  },
  post_user: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  socialImage: {
    width: 40,
    height: 40,
    borderRadius: 80 / 2,
    padding: 8
  },
  userImage: { width: 60, height: 60, borderRadius: 60 / 2, padding: 8 },
  ProfileImage: {
    padding: 10,
    width: 120,
    height: 120,
    borderRadius: 120 / 2
  },
  social_container: {
    flex: 1,
    padding: 16,
    justifyContent: "center"
  },
  tag_container: {
    backgroundColor: styleIndex.Colors.lightgray,
    borderRadius: 10,
    paddingStart: 12,
    paddingEnd: 12,
    paddingTop: 4,
    margin: 8,
    paddingBottom: 4,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center"
  },
  defaultContainer: {
    flex: 1,
    padding: 10
  },
  defaultContainerEnd: {
    flex: 1,
    padding: 10,
    justifyContent: "flex-end"
  },
  buttonContainer: {
    padding: 15
  },
  buttonInner: {
    marginBottom: 15
  },
  labelText: {
    color: "#333",
    fontSize: 15,
    fontWeight: "500",
    marginBottom: 15
  },
  item: {
    borderWidth: 1,
    borderColor: "#333",
    backgroundColor: "#FFF"
  },
  label: {
    color: "#333"
  },
  itemSelected: {
    backgroundColor: "#333"
  },
  labelSelected: {
    color: "#FFF"
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover" // or 'stretch'
  },
  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 1
  },
  customTagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    backgroundColor: "#efeaea",
    width: 300
  },
  customTag: {
    backgroundColor: "#9d30a5",
    justifyContent: "center",
    alignItems: "center",
    height: 30,
    marginLeft: 5,
    marginTop: 5,
    borderRadius: 30,
    padding: 8
  },

  header: {
    backgroundColor: "#9d30a5",
    height: 80,
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 15,
    marginBottom: 10
  },

  label1: {
    color: "#614b63",
    fontWeight: "bold",
    marginBottom: 10
  },
  messageContainer: {
    marginTop: 160,
    height: 200,
    alignSelf: "stretch",
    marginLeft: 20,
    marginRight: 20
  },
  message: {
    backgroundColor: "#efeaea",
    height: 200,
    textAlignVertical: "top"
  },
  loadingContainer: {
    flex: 1,
    padding: 16,
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  flatlist: {
    flex: 1
  },
  bio_text: {
    alignContent: "center",
    textAlign: "justify",
    padding: 12,
    fontFamily: "Georgia-Bold",
    fontSize: 16,
    color: "#070707",
    alignSelf: "center"
  },
  title_text: {
    textAlign: "justify",
    fontFamily: "Georgia-Bold",
    fontSize: 16,
    color: "#070707",
    fontWeight: "bold"
  },
  inputtext: {
    width: "100%",
    borderColor: "gray",
    borderRadius: 4,
    margin: 8,
    borderWidth: 0.5,
    marginEnd: 16,
    fontSize: 15,
    textAlignVertical: "top",
    alignSelf: "baseline",
    justifyContent: "flex-start"
  }
});
