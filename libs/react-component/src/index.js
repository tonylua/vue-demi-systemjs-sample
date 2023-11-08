import React from "react";
import ReactDom from "react-dom/client";
import WeatherConsumer from "./components/WeatherConsumer";

const root = ReactDom.createRoot(document.getElementById("root"));
root.render(<WeatherConsumer city="秦皇岛" temperature={5} />);
