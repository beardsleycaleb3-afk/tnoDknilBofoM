class AssetThemeManager {
  constructor() {
    this.glyphs = new Map();     // 0oo0O00O → geometry
    this.themes = {
      'sultan47': { bg: '#1a237e', gold: '#ffd700' }
    };
    this.assets = {};            // Three.js loaded
  }

  loadGlyph(strand) {
    // 0oo0O00O → hexocta vertices
    const geo = this.decodeGlyph(strand);
    this.glyphs.set(strand, geo);
    return geo;
  }

  setTheme(name) {
    const theme = this.themes[name];
    document.documentElement.style.setProperty('--bg', theme.bg);
    document.documentElement.style.setProperty('--gold', theme.gold);
  }

  getThreeData(glyph) {
    return {
      geometry: this.glyphs.get(glyph),
      theme: this.themes.sultan47
    };
  }
}

export const manager = new AssetThemeManager();
