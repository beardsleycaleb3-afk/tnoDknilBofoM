const PGE = (() => {
  const glyphs = ['0oo0O00O', 'o1O9', 'r1h2'];  // Master list
  
  const process = async (glyph) => {
    const geo = await Orchestrator.processGlyph(glyph);
    ecs.createEntity(geo);
    map.render(geo);
  };
  
  const run = () => {
    glyphs.forEach(process);  // 3000:1 physics
  };
  
  return { process, run, glyphs };
})();
