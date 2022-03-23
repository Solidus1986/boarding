import { useEffect, useState } from 'react'

type ScreenType = "INITIAL" | "DESKTOP" | "TABLET" | "MOBILE";
type Width = number;
type Height = number

export default function useResponsive() {
  const [windowWidth, setWindowWidth] = useState<Width>(0);
  const [windowHeight, setWindowHeight] = useState<Height>(0);
  const [screenType, setScreenType] = useState<ScreenType>("INITIAL");

 useEffect(() => {
    updateWindowDimensions();
    window.addEventListener("resize", updateWindowDimensions);

    return function cleanup() {
      window.removeEventListener("resize", updateWindowDimensions);
    };
  }, [windowWidth, windowHeight]);

  const updateWindowDimensions = () => {
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);
    if (window.innerWidth > 1024) {
      setScreenType("DESKTOP");
    } else if (window.innerWidth <= 1023 && windowWidth > 767) {
      setScreenType("TABLET");
    } else {
      setScreenType("MOBILE");
    }
  };

  return {
    windowWidth,
    windowHeight,
    screenType,
  };
};