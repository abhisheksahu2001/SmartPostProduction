import React, { useEffect, useState } from 'react';
import { Player, Controls } from '@lottiefiles/react-lottie-player';

function Lottieplayer() {
  const [lottie, setLottie] = useState('');
  useEffect(() => {
    if (localStorage.getItem('theme') === 'dark') {
      setLottie('Dark');
    } else {
      setLottie('Light');
    }
  }, []);
  const Style = {
    width: '400px',
  };
  const lottieplayer = () => {
    if (lottie === 'Dark') {
      return (
        <Player
          hover
          src="../../public/logo/trans_light_1.json"
          style={Style}
        />
      );
    }
    if (lottie === 'Light') {
      return (
        <Player hover src="../../public/logo/trans_Dark_1.json" style={Style} />
      );
    }
  };
  return lottieplayer();
}

export default Lottieplayer;
