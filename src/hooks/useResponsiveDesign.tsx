
import { useState, useEffect } from 'react';

export const useResponsiveDesign = () => {
  const [screenSize, setScreenSize] = useState('lg');

  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      if (width < 640) setScreenSize('sm');
      else if (width < 768) setScreenSize('md');
      else if (width < 1024) setScreenSize('lg');
      else setScreenSize('xl');
    };

    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  const getGridCols = (sm: number, md: number, lg: number) => {
    const colMap = {
      1: 'grid-cols-1',
      2: 'grid-cols-2', 
      3: 'grid-cols-3',
      4: 'grid-cols-4',
      5: 'grid-cols-5',
      6: 'grid-cols-6'
    };

    return `${colMap[sm as keyof typeof colMap]} sm:${colMap[md as keyof typeof colMap]} lg:${colMap[lg as keyof typeof colMap]}`;
  };

  return { screenSize, getGridCols };
};
