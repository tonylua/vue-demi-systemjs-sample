// react component
import { useRef, useMemo } from "react";
import styled from "styled-components";
import { Tag, Icon } from "tiny-ui";
import "tiny-ui/dist/styles/index.css";

const ComponentContainer = styled.div`
  border: 1px dashed #f23288;
  border-radius: 10px;
  width: 300px;
  box-sizing: border-box;
  padding: 20px;
`;

export default function WeatherConsumer(props) {
  const { city, temperature, onMsg } = props;

  const compRef = useRef(null);

  const centigrade = useMemo(() => `${temperature || "--"}℃`, [temperature]);

  const onCompClick = () => {
    if (typeof onMsg === "function") onMsg(city);
  };

  return (
    <ComponentContainer
      ref={compRef}
      className="react-consumer"
      onClick={onCompClick}
    >
      <h1 part="title" style={{ color: "#ddd" }}>
        &lt;react-weather-consumer/&gt;
      </h1>
      <Icon name="skin" size={30} />
      {city}: <Tag color="volcano">{centigrade}</Tag>
    </ComponentContainer>
  );
}
