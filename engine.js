const PGE = (() => {
  const glyphs = ['0oo0O00O', 'o1O9', 'r1h2'];
  
  const process = async (glyph) => {
    const geo = await Orchestrator.processGlyph(glyph); // Go→Rust→Ruby→C#→ASM
    ecs.createEntity(geo);
    return geo;
  };
  
  const run = async () => {
    for (const glyph of glyphs) {
      await process(glyph);
    }
  };
  
  return { process, run, glyphs };
})();
