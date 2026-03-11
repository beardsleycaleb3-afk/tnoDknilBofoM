const ecs = (() => {
  const entities = new Map();  // Master list
  
  const createEntity = (glyph) => {
    const geo = Orchestrator.processGlyph(glyph);  // Backend call
    const entity = { id: Date.now(), geo, stats: {} };
    entities.set(entity.id, entity);
    return entity;
  };
  
  const query = (type) => Array.from(entities.values())
    .filter(e => e.geo.includes(type));
  
  const update = () => {
    for (const entity of entities.values()) {
      combat.update(entity);  // Nested module call
    }
  };
  
  return { createEntity, query, update, entities };
})();
