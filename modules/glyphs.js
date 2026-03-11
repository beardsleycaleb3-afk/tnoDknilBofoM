// 64KB Virtual 8-bit Memory Map + 36-glyph → 6502 Opcodes
export const glyphs = {
  // Zero Page Math ($0000-$00FF) - o1-o9 Accumulator
  'o1': { opcode: 'LDA #$01', a: 1, addr: 0x0001 },
  'o9': { opcode: 'LDA #$09', a: 9, addr: 0x0009 },
  'O9': { opcode: 'CMP #$09', flags: 'reflect', addr: 0x0009 },
  '0':  { opcode: 'CLC', flags: 'clear', addr: 0x0000 },
  
  // Stack ($0100-$01FF) - Nesting/Recursion
  '(':  { opcode: 'JSR', stack: true },
  ')':  { opcode: 'RTS', stack: true },
  '+':  { opcode: 'ORA', logic: 'combine' },
  
  // PPU Graphics ($2000-$2007) - Sprites
  'a1': { opcode: 'LDX #$01', ppu: 0x2003, sprite: 1 },
  'A1': { opcode: 'STA $2006', ppu: 0x2006, tile: 1 },
  
  // PRG-ROM ($8000-$FFFF) - Game Logic  
  'b0': { opcode: 'JSR $C000', prg: 0xC000, subroutine: 'battle' },
  'd1': { opcode: 'bankswitch', prg: 0x8000 },
  
  // EXECUTE: b0(o1) → JSR $C000 + LDA #$01
  process(strand) {
    const ops = [];
    const stack = [];
    
    // Parse nested glyphs: b0(o1O9)
    const parse = (glyph) => {
      if (glyph === '(') stack.push(ops.length);
      else if (glyph === ')') {
        const start = stack.pop();
        ops[start] = { subroutine: ops.slice(start+1) };
      }
      else ops.push(this[glyph] || { unknown: glyph });
    };
    
    strand.replace(/b0|(o[1-9]O9)|[oO0aAbd()]/g, parse);
    return ops;  // Binary strand complete
  }
};
