const save = (() => {
  const SAVE_VERSION = 'v1.0';
  const KEY = 'pge-snes-save';
  
  const serialize = () => {
    const state = {
      version: SAVE_VERSION,
      ecs: Array.from(ecs.entities),
      player: { stats: stats.player, inventory: inventory.items },
      map: map.current,
      timestamp: Date.now()
    };
    localStorage.setItem(KEY, JSON.stringify(state));
  };
  
  const load = () => {
    const data = localStorage.getItem(KEY);
    if (!data) return false;
    
    const state = JSON.parse(data);
    ecs.entities = new Map(state.ecs);
    stats.player = state.player.stats;
    return true;
  };
  
  const slots = [1, 2, 3];  // SNES-style 3 slots
  
  return { serialize, load, slots };
})();
