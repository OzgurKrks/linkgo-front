import blueBg from "../src/assets/images/blueBg.png";
import yellowBg from "../src/assets/images/yellowBg.png";
import redBg from "../src/assets/images/redBg.png";
import greenBg from "../src/assets/images/greenBg.png";
import purpleBg from "../src/assets/images/purpleBg.png";
import orangeBg from "../src/assets/images/orangeBg.png";

const backgroundsStyle = [
  {
    id: "1",
    bg: "#06adef",
    name: "blue",
    img: blueBg,
  },
  {
    id: "2",
    bg: "#ffde59",
    name: "yellow",
    img: yellowBg,
  },
  {
    id: "3",
    bg: "#ff5757",
    name: "red",
    img: redBg,
  },
  {
    id: "4",
    bg: "#00bf63",
    name: "green",
    img: greenBg,
  },
  {
    id: "5",
    bg: "#ff66c4",
    name: "purple",
    img: purpleBg,
  },
  {
    id: "6",
    bg: "#ff914d",
    name: "orange",
    img: orangeBg,
  },
];

const FillButtons = [
  {
    id: 1,
    radius: "0px",
    color: "white",
    backgroundColor: "black",
  },
  {
    id: 2,
    radius: "10px",
    color: "white",
    backgroundColor: "black",
  },
  {
    id: 3,
    radius: "30px",
    color: "white",
    backgroundColor: "black",
  },
];

const OutlineButtons = [
  {
    id: 1,
    radius: "0px",
    color: "black",
    backgroundColor: "white",

    border: "1px solid black",
  },
  {
    id: 2,
    radius: "10px",
    color: "black",
    backgroundColor: "white",

    border: "1px solid black",
  },
  {
    id: 3,
    radius: "30px",
    color: "black",
    backgroundColor: "white",

    border: "1px solid black",
  },
];

const ShadowButtons = [
  {
    id: 1,
    radius: "0px",
    color: "black",
    backgroundColor: "white",
    shadow: "0 3px 3px rgba(0, 0, 0, 0.8)",
    border: "1px solid black",
  },
  {
    id: 2,
    radius: "10px",
    color: "black",
    backgroundColor: "white",
    shadow: "0 3px 3px rgba(0, 0, 0, 0.8)",
    border: "1px solid black",
  },
  {
    id: 3,
    radius: "30px",
    color: "black",
    backgroundColor: "white",
    shadow: "0 3px 3px rgba(0, 0, 0, 0.8)",
    border: "1px solid black",
  },
];

export { backgroundsStyle, FillButtons, OutlineButtons, ShadowButtons };
