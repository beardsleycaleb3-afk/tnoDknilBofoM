export const glyphs = {
  // Zero Page Math ($0000-$00FF)
  'o1': () => ({ opcode: 'LDA #$01', value: 1 }),  // Attack
  'O9': () => ({ opcode: 'CMP #$09', reflect: true }),
  
  // Stack Nesting ($0100-$01FF)  
  '(': () => 'JSR',  // Push subroutine
  ')': () => 'RTS',  // Pop return
  
  // PPU Graphics ($2000-$2007)
  'a1': () => ({ sprite: 1, oam: 0x2003 }),
  
  process(strand) {
    // b0(o1) → JSR $C000 + LDA #$01
    return strand.split('(').map(g => this[g]()).flat();
  }
};
