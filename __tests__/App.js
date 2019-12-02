import "react-native";
import React from "react";
import App from "../App.tsx";
import Splash from "../src/scenes/Splash.tsx";
import Login from "../src/scenes/Login.tsx";
import HomePage from "../src/scenes/HomePage.tsx";

// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";

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
