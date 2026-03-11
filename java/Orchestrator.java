public static String processGlyph(String glyph) {
    String go = GoBridge.process(glyph);      // 31% NEW
    String rust = RustJNI.decode(go);         
    String ruby = RubyDSL.translate(rust);    
    String cs = CSharpGeometry.assemble(ruby);
    String asm = AsmBridge.execute(cs);
    return asm;
}
