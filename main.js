import { PGE } from './engine.js';
import { ecs } from './modules/ecs.js';
import { combat } from './modules/combat.js';

const Game = (() => {
  const canvas = document.getElementById('game');
  const ctx = canvas.getContext('2d');
  canvas.width = 320; canvas.height = 240;
  
  const init = async () => {
    PGE.run();  // Glyph physics → ECS
    gameLoop();
  };
  
  const gameLoop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ecs.update();
    combat.render(ctx);
    requestAnimationFrame(gameLoop);
  };
  
  return { init };
})();

Game.init();
