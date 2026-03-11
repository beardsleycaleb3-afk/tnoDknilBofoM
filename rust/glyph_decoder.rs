// rust/glyph_decoder.rs
pub fn decode_glyph(glyph: &str) -> [f32; 42] {
    match glyph {
        "0oo0O00O" => [
            0.0, 1.0, 0.0,  1.0, 0.0, 0.0,  0.0,-1.0, 0.0, // hexocta
            // ... 14 verts, zero alloc
        ],
        _ => [0.0; 42],
    }
}
