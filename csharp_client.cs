using System.Text.Json;

var data = JsonSerializer.Deserialize<ThreeData>(await new HttpClient().GetStringAsync("http://localhost:8080/three"));
Console.WriteLine(data.Geometry);  // glyph vertices
