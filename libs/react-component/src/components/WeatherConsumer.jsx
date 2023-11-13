// react component
import { useRef, useMemo } from "react";
import styled, { StyleSheetManager } from "styled-components";
import { Tag, Icon } from "tiny-ui";
import "tiny-ui/dist/styles/index.css";

export default function WeatherConsumer(props) {
  // @ts-ignore
  window.globalVar1 = "reactGlobalVar123";
  // @ts-ignore
  console.log(
    "⚛️ react fc",
    window.globalVar1,
    window.__CONTEXT_NAME__,
    window.__COMPONENT_HOST_VUE_VERSION__
  );

  const { city, temperature, onMsg } = props;

  const compRef = useRef(null);

  const centigrade = useMemo(() => `${temperature || "--"}℃`, [temperature]);

  const onCompClick = () => {
    if (typeof onMsg === "function") onMsg(city);
  };

  const ComponentContainer = styled.div`
    border: 1px dashed #f23288;
    border-radius: 10px;
    width: 300px;
    box-sizing: border-box;
    padding: 20px;
  `;

  return (
    <StyleSheetManager disableCSSOMInjections={true}>
      <ComponentContainer
        ref={compRef}
        className="react-consumer"
        onClick={onCompClick}
      >
        <h1 part="title" style={{ color: "#ddd" }}>
          &lt;react-weather-consumer/&gt;
        </h1>
        {city}: <Tag color="volcano">{centigrade}</Tag>
        <Icon name="skin" size={30} />
      </ComponentContainer>
    </StyleSheetManager>
  );
}
