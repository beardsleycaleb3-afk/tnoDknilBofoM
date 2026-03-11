const render = (() => {
  const ctx = document.getElementById('game').getContext('2d');
  
  const drawHexocta = (geo, x, y) => {
    ctx.fillStyle = '#00ff41';
    ctx.shadowColor = '#00ff41';
    ctx.shadowBlur = 10;
    
    // Glyph geometry → 16-bit pixels
    ctx.fillRect(x, y, 16, 16);  // Hexocta tile
    ctx.fillRect(x+8, y+8, 8, 8); // Core glow
  };
  
  const renderWorld = () => {
    ecs.query('hexocta').forEach((entity, i) => {
      drawHexocta(entity.geo, (i%20)*16, Math.floor(i/20)*16);
    });
  };
  
  return { drawHexocta, renderWorld };
})();
