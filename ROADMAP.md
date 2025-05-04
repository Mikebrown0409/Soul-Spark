# SoulSpark Project Roadmap (v2 - AAA Indie Focus)

This roadmap outlines the development phases for SoulSpark, aiming for AAA indie quality standards by integrating visual polish, robust logic, performance optimization, and the core therapeutic vision.

**Legend:**
*   [ ] To Do
*   [/] In Progress / Partially Done
*   [x] Completed

---

## Phase 0: Core Rendering & Stability (❗ CURRENT PRIORITY ❗)

*Goal: Establish a stable, working render loop and resolve critical bugs.*

- [ ] **Fix Black Screen Issue:** Systematically debug and resolve the current rendering failure. (Top Priority)
- [ ] **Establish Minimal Stable Scene:** Confirm rendering of basic scene (camera, renderer, simple placeholder object, basic lighting) without errors.
- [ ] **Skybox Integration (Corrected):**
    - [ ] Obtain or create the missing `pz.png` texture.
    - [ ] Implement `CubeTextureLoader` correctly with all 6 textures.
    - [ ] Verify skybox renders without errors.
- [ ] **Implement Robust Error Handling:** Add better logging and explicit checks (e.g., WebGL context availability). (✓ - Basic checks added)

## Phase 1: Foundational Elements

*Goal: Solidify the core project structure, essential Three.js components, and basic interaction controls.*

- [x] Project Structure (HTML, CSS, JS, Assets, PWA files)
- [x] Include Three.js Library & Dependencies
- [x] Basic 3D Scene (Scene, Camera, Renderer)
- [x] Basic Lighting (Hemisphere, Directional) (✓ - Needs refinement for style)
- [x] Camera Controls (`OrbitControls`)
- [x] Basic UI Overlay Placeholder

## Phase 2: Core Spark Implementation (MVP)

*Goal: Implement the Spark companion's basic visual form, movement, and interaction placeholders.*

-   **Visuals:**
    - [ ] **Spark Model:** Integrate a placeholder GLTF model or create a basic procedural mesh for the Spark.
    - [ ] **Spark Shader v1:** Develop initial GLSL shader for the Spark (e.g., solid color + simple Fresnel glow effect).
    - [ ] **Spark Animation:** Basic hover/bobbing animation. (✓ - Refine)
    - [ ] **Particle Effect v1:** Simple particle trail or aura for the Spark.
-   **Logic:**
    - [x] **Spark Customization UI (Color):** Allow color selection.
    - [ ] **Spark Movement:** Basic follow logic (e.g., lerping towards a target point near the camera/player).
    - [ ] **Placeholder Dialogue System:** UI Input/Output fields, Send button. **NO API YET.**

## Phase 3: World Building - Enchanted Forest Biome 1 (MVP)

*Goal: Create the initial game environment with basic navigation and interaction, focusing on the Ghibli-inspired aesthetic.*

-   **Visuals:**
    - [ ] **Procedural Ground:** Refine existing shader or create new one for dynamic, stylized terrain (grass, dirt patches, subtle elevation variation). (✓ - Basic shader exists, needs aesthetic refinement)
    - [ ] **Environment Assets v1:** Add placeholder stylized assets (trees, rocks, flowers) matching the Ghibli theme.
    - [ ] **Atmosphere v1:** Implement subtle fog or atmospheric perspective.
    - [ ] **Lighting Refinement:** Tune lights and shadows (soft shadows) to establish the desired mood.
-   **Logic:**
    - [ ] **Player/Spark Navigation:** Implement basic movement controls (e.g., click-to-move).
    - [ ] **Interaction System:** Implement raycasting for selecting objects/Spark.
    - [ ] **Collectibles:** Add `Glow Orb` placeholders that can be collected. UI feedback for collection.

## Phase 4: Core Therapeutic Loop - LightSync (Prototype)

*Goal: Implement the first therapeutic mini-game prototype.*

-   **Visuals:**
    - [ ] Implement Breathing Guide UI element (e.g., expanding/contracting circle).
    - [ ] Sync Spark's shader glow/intensity with the breathing guide visually.
-   **Logic:**
    - [ ] Implement LightSync game mechanics (start/stop, sync tracking).
    - [ ] Basic state management for the mini-game.

## Phase 5: Spark Enhancement & AI Integration

*Goal: Improve the Spark's visual feedback and integrate secure AI dialogue.*

-   **Visuals:**
    - [ ] **Spark Shader v2:** Enhance shader for mood-based effects (color shifts, intensity changes).
    - [ ] **Particle Effect v2:** More refined particle effects linked to Spark state.
-   **Logic:**
    - [ ] **Secure Gemini API Backend:** Implement a secure backend function or proxy for API calls (NO frontend keys).
    - [ ] **Dialogue Integration:** Connect UI to backend, send user input, display AI response.
    - [ ] **Bond Mechanic v1:** Track basic interactions (e.g., dialogue frequency, petting gesture), update UI placeholder. (✓ - Basic UI exists)
    - [ ] **Spark Personality v1:** Implement simple state logic affecting dialogue tone or behavior.

## Phase 6: Visual Polish & Optimization Pass 1

*Goal: Improve overall visual quality towards AAA indie standards and ensure baseline mobile performance.*

-   **Visuals:**
    - [ ] **Art Asset Pass 1:** Begin replacing placeholder environment/Spark assets with higher-fidelity, stylized models/textures.
    - [ ] **Post-Processing v1:** Implement basic stack (Bloom refined, potentially Depth of Field if performant).
    - [ ] **Lighting & Shadow Pass:** Further refine lighting for atmosphere and visual appeal.
-   **Performance:**
    - [ ] **Profiling:** Establish baseline performance metrics on target mobile range.
    *   [ ] **Optimization:** Draw call batching/instancing, shader optimization, texture compression/atlasing.

## Phase 7: Expanded World & Gameplay Systems

*Goal: Add more content, gameplay variety, and core progression systems.*

-   **Visuals:**
    - [ ] **Biome 2 (Concept):** Design and implement MVP of a second distinct area (e.g., Crystal Canyons).
    - [ ] **Interactive Elements:** Add more environmental details that react to the player/Spark.
-   **Logic:**
    - [ ] **Orb Garden Prototype:** Implement mechanics for planting/growing visual representations of positive thoughts.
    - [ ] **StarSong Prototype:** Implement mechanics for creating simple melodies/visuals via star connection.
    - [ ] **Narrative/Quest System v1:** Simple system to guide player tasks.
    - [ ] **Progression System:** Implement `GlowPoints` accumulation and spending for unlocks (e.g., Spark cosmetics). (✓ - Basic GP tracking exists)
    - [ ] **SoulMap UI:** Implement basic visual representation of progress/mood tracking. (✓ - Button exists)

## Phase 8: Audio Integration

*Goal: Add sound and music to enhance immersion and feedback.*

-   [ ] **Audio Engine:** Implement basic spatial audio.
-   [ ] **Music:** Add background music loops (context-sensitive if possible).
-   [ ] **SFX:** Integrate UI sounds, interaction sounds, Spark vocalizations/sounds.

## Phase 9: Advanced Features & Social MVP

*Goal: Refine core systems and add initial social/sharing capabilities.*

-   **Visuals:**
    - [ ] **Advanced Spark Customization:** Implement UI and logic for more options (shapes, accessories).
-   **Logic:**
    - [ ] **SparkShare MVP:** Implement basic screenshot sharing with Spark appearance data.
    - [ ] **Refine Mini-Games:** Improve prototypes based on internal testing/feedback.
    - [ ] **Expand Spark AI:** Add more dialogue variety, simple memory.
-   [ ] **AR Integration (Proof of Concept):** Explore basic AR display of the Spark model.

## Phase 10: Beta Testing & Final Polish

*Goal: Refine all aspects based on testing, fix bugs, and achieve release quality.*

-   **Visuals:**
    - [ ] **Final Art Pass:** Ensure all assets meet quality bar.
    - [ ] **UI/UX Overhaul:** Finalize interface design and flow.
-   **Logic:**
    - [ ] **Bug Fixing:** Address issues found during testing.
    - [ ] **Balancing:** Tune progression, rewards, difficulty.
-   **Performance:**
    - [ ] **Final Optimization Pass:** Ensure smooth framerate on target devices.
-   **Testing:**
    - [ ] **Formal QA Cycle:** Structured testing process.
    - [ ] **User Acceptance Testing (UAT):** Gather feedback from target users.

## Phase 11: Launch & Live Ops Prep

*Goal: Prepare for public release and ongoing operations.*

-   [ ] **Backend Infrastructure:** Finalize server needs (authentication, data persistence).
-   [ ] **Analytics Integration:** Implement key metric tracking.
-   [ ] **Marketing Materials:** Prepare store assets, trailers.
-   [ ] **Deployment Strategy:** Plan build process and platform submission.

## Post-Launch

*Goal: Support the live game and plan future content.*

-   [ ] Content Updates (New biomes, story arcs, mini-games, Spark features).
-   [ ] Community Management & Feedback Loops.
-   [ ] Ongoing Performance Monitoring & Optimization.
-   [ ] Live Events / Seasonal Content. 