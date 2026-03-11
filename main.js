import { glyphs } from './modules/glyphs.js';
import { ecs } from './modules/ecs.js';

const playerAttack = glyphs.process('b0(o1)');  // Battle sub + LDA #$01
ecs.create('player', { attack: playerAttack.value });
