import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { canvasArray, maxCanvasWidth, maxCanvasHeigth } from '../_common/config';

const TheCanvas = styled.canvas`
  position: fixed;
  top: 0;
  left: 0;
  z-index: -10;
  background: linear-gradient(#799ad6, #4469b1);
`;

const Canvas = () => {
  const canvasRef = React.useRef(null);
  const [scrollPos, setscrollPos] = useState(0);
  const [windowWidth, setwindowWidth] = useState();
  const [windowHeigth, setwindowHeigth] = useState();

  let ctx = null;

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onResize);
    const canvas = canvasRef.current;
    ctx = canvas.getContext('2d');
    drawRectangles();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  });

  const onScroll = () => {
    setscrollPos(window.pageYOffset);
  };

  const onResize = () => {
    setwindowWidth(window.innerWidth);
    setwindowHeigth(window.innerHeigth);
  };

  const drawRectangles = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    onResize();
    ctx.clearRect(0, 0, width, height);
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

  return (
    <TheCanvas
      ref={canvasRef}
      width={windowWidth || maxCanvasWidth}
      height={windowHeigth || maxCanvasHeigth}
    />
  );
};

export default Canvas;
