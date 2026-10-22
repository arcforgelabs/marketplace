# Themes in Replit projects

[arcforgelabs/themes](https://github.com/arcforgelabs/themes) is the only home
for Arc Forge themes. Obey its `README.md` to choose and apply one.

Do not save themes as Replit workspace design systems (Settings → Design
systems), and do not build them in throwaway Replit projects. Those are copies:
they go stale when the catalog changes, and each builder project stays in the
workspace's Recents. If you find one, list it for a person. Delete it only
after a person confirms it is an unused Arc Forge copy; deletion cannot be
undone.

## Apply a theme to a Replit project

Not yet run end to end on a Replit project; record what you observe the first
time.

1. In your clone, on a branch: apply the theme as the themes README says under
   "Apply a catalog theme → In a repo". That is the shadcn preset, plus
   `themes/<slug>/DESIGN.md` copied to the repo root as `DESIGN.md`.
2. In the same branch, add a "Design" section to `replit.md`: "Follow
   `DESIGN.md` at the repo root. It comes from arcforgelabs/themes. Change the
   theme there and copy it again; do not edit it here."
3. Open a pull request, merge it, then `scripts/github-sync.sh pull` in the
   workspace. The Replit Agent reads `replit.md` and finds `DESIGN.md`.

## Verify in the preview

Compare the preview's computed tokens with the `DESIGN.md` front matter, light
and dark. Replit stores colours as bare HSL triplets read through
`hsl(var(--x))`: wrap the raw value in `hsl()` and paint it on a 1×1 canvas to
get hex with alpha.

Check the dark `border`, `input` and `sidebar-border` first. Replit's colour
converter has rounded HSL a step off and dropped the alpha byte of 8-digit hex
(`#FFFFFF1A` became opaque white, so every dark border turned white). If a
value is wrong, tell the project Agent the token and the exact hex, then check
again.
