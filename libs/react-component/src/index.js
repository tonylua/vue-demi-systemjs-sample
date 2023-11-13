import React from "react";
import ReactDom from "react-dom/client";
import WeatherConsumer from "./components/WeatherConsumer";

const mountPoint = document.createElement("div");
const container = document.getElementById("root");
container.attachShadow({ mode: "open" }).appendChild(mountPoint);

const root = ReactDom.createRoot(mountPoint);
root.render(<WeatherConsumer city="秦皇岛" temperature={5} />);
