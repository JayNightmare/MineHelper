# MineHelper — Project Memory

## Project Overview
**MineHelper** is a Minecraft build generator website + AI backend. Users describe a build, select blocks and dimensions, pick a building category, and get a generated 3D voxel layout with a materials list and downloadable schematic.

## Tech Stack

### Website
- **Framework**: Vite + React + TypeScript
- **Routing**: React Router v7
- **3D Viewer**: Three.js via @react-three/fiber + @react-three/drei
- **Icons**: Lucide React
- **Styling**: Vanilla CSS (CSS modules + global index.css)
- **Font**: Rubik (Google Fonts)

### AI Backend
- **Framework**: FastAPI + Uvicorn
- **Model**: Qwen2.5-Coder-1.5B-Instruct (fine-tuned with QLoRA)
- **Training**: Unsloth + SFTTrainer (trl), PEFT, bitsandbytes
- **Validation**: Pydantic + pydantic-settings
- **Deployment**: Docker

## Architecture
```
MineHelper/
  Website/
    src/
      engine/
        buildSchema.ts    — TypeScript interfaces (Block, BuildData, etc.)
        generator.ts      — Deterministic seeded build generator (mulberry32 PRNG)
        materialCounter.ts — Aggregates blocks → MaterialCount[], block color map
      components/
        Layout/           — NavBar
        Home/             — DescriptionBox, SizeInputs, BlockSelector, CategorySelector
        Build/            — Viewer3D, Viewer2D, MaterialsList, SchematicDownload, BuildMeta
      pages/
        HomePage.tsx      — Form → navigates to /build
        BuildPage.tsx     — Reads URL params → generates build → renders viewer + sidebar
  AI/
    src/
      main.py             — FastAPI app (POST /generate)
      config.py           — Environment config (pydantic-settings)
      schemas.py          — Pydantic models mirroring BuildData
      inference.py        — Model loading + generation with retry logic
      encoding.py         — Compact block format encoder/decoder
    data/
      generate_dataset.ts — Synthetic training data pipeline
    training/
      train.py            — QLoRA fine-tuning script (Unsloth)
      train_config.yaml   — Training hyperparameters
    tests/
      test_encoding.py    — Encoding round-trip + error tests
      test_api.py         — API smoke tests with mocked model
```

## Key Decisions
- **Compact block encoding**: LLM outputs `DIM:WxHxD` header + type legend + `x,y,z,key` per block. Keeps token count manageable (~2000-4000 tokens per build).
- **Synthetic training data**: Uses the existing deterministic `generator.ts` to produce ~512 training examples. Model learns procedural patterns — not novel architecture.
- **QLoRA**: 4-bit quantisation + LoRA adapters (r=16, alpha=32). Can train on a single 6GB GPU or free Colab.
- **Retry logic**: Inference retries up to 3 times with increasing temperature if output fails to decode.
- **Schematic format**: Plain `.txt` download — not a binary `.litematic`.

## Active Tasks / Next Steps
- [ ] Generate training dataset (`npx tsx data/generate_dataset.ts`)
- [ ] Fine-tune the model (`python training/train.py`)
- [ ] Deploy to `https://mybuild.endpoint-system.uk`
- [ ] Wire frontend to call the real API instead of the mock generator
- [ ] Add block type icons/textures from Minecraft texture packs
- [ ] Add shareable build URLs (seed in URL already, just needs a "copy link" button)
- [ ] Consider saved builds (localStorage)
- [ ] Consider proper `.litematic` binary format support

## Completed Features
- v0.2.0 — AI Backend: FastAPI server, compact encoding, synthetic data pipeline, QLoRA training script, Docker, 11 tests
- v0.1.0 — Initial MVP: Homepage form, seeded build generator, 3D/2D viewer, materials list, schematic download
