import * as React from "react";

const MOBILE_BREAKPOINT = 480;
const TABLET_BREAKPOINT = 768;

type DeviceType = "mobile" | "tablet" | "desktop";

interface DeviceInfo {
  deviceType: DeviceType;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

export function useDeviceType(): DeviceInfo {
  const getDeviceType = (width: number): DeviceInfo => {
    if (width < MOBILE_BREAKPOINT) {
      return {
        deviceType: "mobile",
        isMobile: true,
        isTablet: false,
        isDesktop: false,
      };
    } else if (width < TABLET_BREAKPOINT) {
      return {
        deviceType: "tablet",
        isMobile: false,
        isTablet: true,
        isDesktop: false,
      };
    } else {
      return {
        deviceType: "desktop",
        isMobile: false,
        isTablet: false,
        isDesktop: true,
      };
    }
  };

  const [deviceInfo, setDeviceInfo] = React.useState<DeviceInfo>(() =>
    getDeviceType(window.innerWidth)
  );

  React.useEffect(() => {
    const onResize = () => {
      setDeviceInfo(getDeviceType(window.innerWidth));
    };

    window.addEventListener("resize", onResize);
    onResize();

    return () => window.removeEventListener("resize", onResize);
  }, []);

  return deviceInfo;
}
