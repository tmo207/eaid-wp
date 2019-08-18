import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { canvasArray } from '../_common/config';

const TheCanvas = styled.canvas`
  position: fixed;
  top: 0;
  left: 0;
  z-index: -10;
  background: linear-gradient(#799ad6, #4469b1);
`;

const Canvas = () => {
  const canvasRef = React.useRef(null);
  const [scrollPos, setscrollPos] = useState(window.pageYOffset);
  let ctx = null;

  const onScroll = () => {
    setscrollPos(window.pageYOffset);
  };

  const drawRectangles = () => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    ctx.clearRect(0, 0, windowWidth, windowHeight);
    canvasArray.map(el => {
      const { x, y, potentFactor, simpleFactor } = el;
      const sizeX = 30;
      const sizeY = 50;

      ctx.fillStyle = `rgba(92, 109, 141, ${simpleFactor})`;
      return ctx.fillRect(
        x,
        y + (scrollPos * potentFactor * 20) / 1000,
        sizeX * simpleFactor,
        sizeY * simpleFactor
      );
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    const canvas = canvasRef.current;
    ctx = canvas.getContext('2d');
    drawRectangles();

    return () => {
      window.removeEventListener('scroll', () => onScroll);
    };
  });
  return (
    <TheCanvas
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
    />
  );
};

export default Canvas;
