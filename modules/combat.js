const combat = (() => {
  const init = () => { /* ... */ };
  
  const attack = (entity) => {
    const glyphDamage = decodeGlyph('o1O9');  // 1F×2F=3F
    entity.stats.hp -= glyphDamage;
  };
  
  return { init, attack };
})();
