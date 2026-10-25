/* Theme registry slot. This file does not hold a theme catalog.
   Themes and logos come from @arcforgelabs/themes.
   Pin: github:arcforgelabs/themes#v2026.10.1
   The tools copy of scripts/sync-themes fetches that tag, or the GitHub Release
   archive arcforge-themes-<version>.tar.gz, and writes the theme list here.
   This public tree has no scripts directory. Do not add one.
   Do not copy theme values, logo files, or the diagram colour key into this skill.
   explainer.js (themeEngine) reads window.ExThemes. Arc Forge is the fallback id. */
window.ExThemes = {
  "fallback": "arc-forge",
  "source": "github:arcforgelabs/themes#v2026.10.1",
  "themes": []
};
