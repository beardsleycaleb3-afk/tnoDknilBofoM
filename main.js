import { Orchestrator } from '../java/Orchestrator.js';

const Game = (() => {
  // Nested glyph physics
  const decodeGlyph = (strand) => Orchestrator.processGlyph(strand);
  
  // ECS master list
  const entities = new Map();
  
  const init = () => {
    const geo = decodeGlyph('0oo0O00O');  // Rust→C#→Ruby→ASM
    map.load(geo);
    combat.init();
  };
  
  // Module list dispatcher
  const modules = {
    ecs, eventbus, stats, inventory, combat, 
    movement, loot, uiflash, lootsystem, map, enemy
  };
  
  return { init, modules, entities };
})();

Game.init();
