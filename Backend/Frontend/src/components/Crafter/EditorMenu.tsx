/* eslint-disable */
import { motion } from 'framer-motion';
import React, { useMemo, useState } from 'react';
import MenuNav from './MenuNav';
import Preview from './MenuNavItems/Preview';
import Enhancer from './MenuNavItems/Enhancer';
import AIHelper from './MenuNavItems/AIHelper';
import BoilerUi from './MenuNavItems/BoilerUi';

interface EditorMenuProps {
  caption: string;
  URlImage: {
    row: File;
    url: string;
  } | null;
}

function EditorMenu({ caption, URlImage }: EditorMenuProps) {
  const [selectedMenu, setSelectedMenu] = useState('boiler');

  const ShowComponent = useMemo(() => {
    switch (selectedMenu) {
      case 'Preview':
        return <Preview caption={caption} URlImage={URlImage} />;
      case 'Enhance':
        return <Enhancer />;
      case 'Ai':
        return <AIHelper />;
      default:
        return <BoilerUi />;
    }
  }, [selectedMenu, setSelectedMenu, caption, URlImage]);

  return (
    <section className=" flex ">
      <div className=" flex-1 m-5 ">
        <div className="flex justify-between items-center ">
          <div className="font-semibold">Enhancer</div>
          <MenuNav ChangeMenu={setSelectedMenu} />
        </div>
        <div className=" flex justify-between py-5 h-full ">
          {ShowComponent}
        </div>
      </div>
    </section>
  );
}

export default EditorMenu;
