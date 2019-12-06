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
  }
});
