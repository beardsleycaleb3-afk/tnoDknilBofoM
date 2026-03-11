class GlyphTranslator
  def translate(strand)
    case strand
    when "0oo0O00O"
      { geometry: [0,1,0, 1,0,0, 0,-1,0], material: "wireframe_gold" }
    end.to_json
  end
end

puts GlyphTranslator.new.translate("0oo0O00O")
