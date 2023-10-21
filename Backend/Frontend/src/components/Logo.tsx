import { Player } from '@lottiefiles/react-lottie-player';
import React, { useEffect, useState } from 'react';
import useResponsive from '../../helpers/useResponsive';

interface LogoProps {
  theme: string;
}

// eslint-disable-next-line react/function-component-definition
const Logo: React.FC<LogoProps> = ({ theme }) => {
  const { breakpoint } = useResponsive();
  const [style, setStyle] = useState({
    width: '200px',
    height: '50px',
  });

  useEffect(() => {
    switch (breakpoint) {
      case 'sm':
        setStyle((prev) => ({ ...prev, width: '100px' }));
        return;
      case 'md':
        setStyle((prev) => ({ ...prev, width: '125px' }));
        return;
      case 'lg':
        setStyle((prev) => ({ ...prev, width: '150px' }));
        return;
      case 'xl':
        setStyle((prev) => ({ ...prev, width: '175px' }));
        return;
      default:
        setStyle((prev) => ({ ...prev, width: '200px' }));
    }
  }, [breakpoint]);

  if (theme === 'light') {
    return (
      <Player
        autoplay
        keepLastFrame
        src="https://lottie.host/713bdff4-5490-4edc-b2f5-8800970cda5b/Ue4m5eMoGk.json"
        style={style}
      />
    );
  }

  return (
    <Player
      autoplay
      keepLastFrame
      src="https://lottie.host/c8aee084-fc32-448e-86ac-8dbc61627ab3/ioUtySJgvW.json"
      style={style}
    />
  );
};

export default Logo;
