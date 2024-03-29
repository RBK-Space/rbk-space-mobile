import "react-native";
import React from "react";
import App from "../App.tsx";
import Splash from "../src/scenes/Splash.tsx";
import Login from "../src/scenes/Login.tsx";
import HomePage from "../src/scenes/HomeScreen";
import PeopleScreen from "../src/scenes/PeopleScreen";
import ProfileScreen from "../src/scenes/ProfileScreen";
import SimpleTabs from "../src/scenes/SimpleTabs";
import Post from "../src/scencesComponents/Post";
import UserItem from "../src/scencesComponents/UserItem";

// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";
jest.useFakeTimers();
it("renders App correctly", () => {
  renderer.create(<App />);
});

it("renders Splash correctly", () => {
  renderer.create(<Splash />);
});

it("renders login correctly", () => {
  renderer.create(<Login />);
});

it("renders homePage correctly", () => {
  renderer.create(<HomePage />);
});

it("renders PeopleScreen correctly", () => {
  renderer.create(<PeopleScreen />);
});
