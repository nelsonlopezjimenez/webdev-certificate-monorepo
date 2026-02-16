The landscape has shifted significantly. **Airbnb's ESLint config is no longer the default recommendation** — it's still used but considered heavy and opinionated for modern setups.

**Current state (2025):**

**ESLint + Prettier** is still the most common setup, but the pain point is managing two tools with conflicting configs. ESLint itself dropped its built-in formatting rules, pushing formatting entirely to Prettier.

**Biome** is the major newcomer — a single Rust-based binary that replaces both ESLint and Prettier. It formats 1,000 files in ~50ms vs 1-2 seconds for ESLint + Prettier. Biome v2.0 (June 2025) added plugins and type-aware linting, which was its biggest gap. One `biome.json` replaces multiple config files.

**Anthony Fu's ESLint config** (`@antfu/eslint-config`) is another popular option — it uses the official ESLint Stylistic plugin for formatting (replacing Prettier), supports JS, TS, React, Vue, Svelte, Markdown and more with minimal setup.

**Quick recommendation for your courses:**

- **New projects / teaching:** Biome is the simplest to set up — zero config works out of the box, students won't fight config files
- **Established teams / existing codebases:** ESLint + Prettier still makes sense given the massive plugin ecosystem
- **Biome's current gaps:** Vue SFCs, Angular templates, and non-JS files like CSS/SCSS/YAML are improving but not fully covered yet

For a web dev certificate program, Biome is worth introducing — one install, one config, linting + formatting done. Then mention ESLint + Prettier as the industry standard they'll encounter on the job.