import { useState, useEffect } from "react";

const useDeviceCheck = () => {
    const [isDesktop, setIsDesktop] = useState(true);

    useEffect(() => {
        const checkDevice = () => {
            const userAgent = navigator.userAgent.toLowerCase();
            const isMobile = /iphone|ipad|android|mobile|touch/i.test(
                userAgent
            );
            const isSmallScreen = window.innerWidth < 1024;
            setIsDesktop(!isMobile && !isSmallScreen);
        };

        checkDevice();
        window.addEventListener("resize", checkDevice);

        return () => window.removeEventListener("resize", checkDevice);
    }, []);

    return isDesktop;
};

export default useDeviceCheck;
