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
    alignItems: "center",
    justifyContent: "center"
  },
  ImageIconStyle: {
    padding: 10,
    margin: 5,
    height: 30,
    width: 30,
    resizeMode: "stretch"
  },
  loginButton: {}
});
