import { throttle } from 'lodash';
import { useEffect, useState } from 'react';

export const WIDTH_SIZES = {
  MINI_TABLET: 640,
  TABLET: 960,
  DESKTOP: 1280,
};

export const useDetectDevice = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isTablet, setIsTablet] = useState<boolean>(false);
  const [isMiniTablet, setIsMiniTabletTablet] = useState<boolean>(false);
  const [isDesktop, setIsDesktop] = useState<boolean>(false);
  const [widthScreen, setWidthScreen] = useState<number>(window.innerWidth);
  const [heightScreen, setHeightScreen] = useState<number>(window.innerHeight);

  useEffect(() => {
    const handleResize = throttle(() => {
      setWidthScreen(window.outerWidth);
      setHeightScreen(window.outerHeight);
      if (window.outerWidth < WIDTH_SIZES.MINI_TABLET) {
        setIsMobile(true);
        setIsTablet(false);
        setIsDesktop(false);
        setIsMiniTabletTablet(false);
      } else if (
        window.outerWidth >= WIDTH_SIZES.MINI_TABLET &&
        window.outerWidth < WIDTH_SIZES.TABLET
      ) {
        setIsMobile(false);
        setIsTablet(false);
        setIsMiniTabletTablet(true);
        setIsDesktop(false);
      } else if (
        window.outerWidth >= WIDTH_SIZES.TABLET &&
        window.outerWidth < WIDTH_SIZES.DESKTOP
      ) {
        setIsMobile(false);
        setIsTablet(true);
        setIsMiniTabletTablet(false);
        setIsDesktop(false);
      } else if (window.outerWidth >= WIDTH_SIZES.DESKTOP) {
        setIsMobile(false);
        setIsTablet(false);
        setIsMiniTabletTablet(false);
        setIsDesktop(true);
      }
    }, 1000);

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return {
    isMobile,
    isTablet,
    isDesktop,
    isMiniTablet,
    widthScreen,
    heightScreen,
  };
};
