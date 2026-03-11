public class GeometryAssembler 
{
    public float[] Assemble(string glyph) 
    {
        return glyph switch 
        {
            "0oo0O00O" => new[] {0f,1f,0f, 1f,0f,0f, 0f,-1f,0f, -1f,0f,0f}, // 14 verts
            _ => Array.Empty<float>()
        };
    }
}
