import { ecs } from './modules/ecs.js';
import { glyphs } from './modules/glyphs.js';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

// Sultan47 God String: x1X1(w0W9(B0(o1O9)))
const player = ecs.create('player', 'b0(o1O9)');

const gameLoop = () => {
  ctx.fillStyle = '#0a0a0a';
  ctx.fillRect(0, 0, 320, 240);
  
  ecs.step();  // 6502 CPU cycle
  
  // Render accumulator
  ctx.fillStyle = '#00ff41';
  ctx.font = '16px Courier New';
  ctx.fillText(`A: ${player.a}`, 10, 20);
  ctx.fillText(`PC: $${player.pc.toString(16)}`, 10, 40);
  
  requestAnimationFrame(gameLoop);
};

gameLoop();
