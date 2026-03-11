import { glyphs } from './glyphs.js';

export const ecs = {
  // 64KB memory map
  zeropage: new Uint8Array(0x100),    // $0000-$00FF
  stack:    new Uint8Array(0x100),    // $0100-$01FF  
  prg:      new Uint8Array(0x8000),   // $8000-$FFFF
  entities: new Map(),
  
  create(id, glyphStrand) {
    const ops = glyphs.process(glyphStrand);
    const entity = {
      id,
      pc: 0x8000,  // Program Counter
      a: 0,        // Accumulator
      ops,         // Glyph opcodes
      execute() {
        const op = this.ops[this.pc >> 8];  // Fetch
        if (op.opcode === 'LDA #$01') this.a = 1;
        this.pc += 2;  // Execute cycle
      }
    };
    this.entities.set(id, entity);
    return entity;
  },
  
  step() {
    for (const entity of this.entities.values()) {
      entity.execute();
    }
  }
};
