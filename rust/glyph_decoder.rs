// rust/glyph_decoder.rs
pub fn decode_glyph(glyph: &str) -> Vec<f32> {
    match glyph {
        "0oo0O00O" => vec![0.0,1.0,0.0, 1.0,0.0,0.0, /* hexocta */],
        _ => vec![]
    }
}
