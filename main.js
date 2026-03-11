import { Orchestrator } from '../java/Orchestrator.js'; // JNI/WASM
import { ecs } from './modules/ecs.js';

async function init() {
  const glyphGeo = await Orchestrator.processGlyph('0oo0O00O');
  ecs.loadGeometry(glyphGeo);  // Rust verts → ECS world
}
