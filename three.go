package main

import (
\t"encoding/json"
\t"fmt"
)

// Three.js data: geometry/position/material split
type ThreeData struct {
\tGeometry []float64 `json:"geometry"`  // 0oo0O00O → vertices
\tPosition []float64 `json:"position"`  // hexocta transform  
\tMaterial []float64 `json:"material"`  // glyph shaders
}

func HexoctaData() ThreeData {
\treturn ThreeData{
\t\tGeometry: []float64{0,1,0, 1,0,0, 0,-1,0, -1,0,0}, // 0oo0O00O vertices
\t\tPosition: []float64{0,0,0},                          // center
\t\tMaterial: []float64{0.5,0.5,1,1},                   // wireframe blue
\t}
}

func main() {
\tdata := HexoctaData()
\tjsonBytes, _ := json.Marshal(data)
\tfmt.Println(string(jsonBytes))  // Java/Three.js consumes
}
