// Rust decoder → JS geometry
export function loadHexocta() {
  return RustDecoder.decode('0oo0O00O');  // 42 floats → map.js
}
