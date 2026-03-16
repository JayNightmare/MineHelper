# Changelog

All notable changes to MineHelper are documented here.

## [0.2.0] — 2026-03-15

### Added
- AI backend (`AI/`) — FastAPI server powered by a fine-tuned Qwen2.5-Coder-1.5B model
- Compact block encoding format for efficient LLM training/inference
- Synthetic training data pipeline (`generate_dataset.ts`) using the existing deterministic generator
- QLoRA fine-tuning script with Unsloth + SFTTrainer
- Pydantic request/response validation matching the website's `BuildData` schema
- Docker deployment support
- 11 unit/integration tests (encoding round-trip + API smoke tests)

## [0.1.0] — 2026-03-15

### Added
- Homepage with description textarea, block multi-selector, size inputs (X/Y), and building category selector
- 8 building categories: House, Factory, Village, Castle, Temple, Tree House, Bridge, Train Station
- Deterministic seeded build generator (mulberry32 PRNG) with per-category shape templates
- 3D voxel viewer (Three.js + R3F) with orbit camera controls
- 2D SVG floor plan viewer with Y-layer slider
- Materials list panel sorted by block count
- Downloadable `.txt` schematic with block counts and build metadata
- Build metadata panel (dimensions, category, seed, inspiration)
- Dark mode design system (Indigo accent, Rubik font, matt surfaces, mouse-position card glow)
- Mobile-friendly responsive layout
