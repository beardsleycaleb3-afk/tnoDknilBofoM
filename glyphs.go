package main

import "fmt"

var GlyphMap = map[string][]byte{
\t"o0": {0xA9, 0x01},  // 1F
\t"oO": {0xC9, 0x09},  // 2F
\t"0oo0": {0x4C, 0xFC, 0xFF},  // hexocta vertices
\t"0oo0O00O": {0x8D, 0x03, 0x20},  // 14-face geometry
}

func Decode(strand string) []byte {
\tvar mem [65536]byte
\tpc := 0
\t
\tfor i := 0; i < len(strand); i++ {
\t\tglyph := strand[i:i+4]  // 0oo0O00O
\t\tif bytes, ok := GlyphMap[glyph]; ok {
\t\t\tcopy(mem[pc:], bytes)
\t\t\tpc += len(bytes)
\t\t}
\t}
\treturn mem[:pc]
}

func main() {
\thexocta := Decode("0oo0O00O")
\tfmt.Printf("% X
", hexocta)  // 8D 03 20
}
