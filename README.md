# ✨ SoulSpark ✨

**Tagline:** _Your Light, Your Guide, Your Spark._

---

## The Vision: Lighting Up Mental Wellness Through Play

**SoulSpark** is not just a game; it's an **empathetic companion** designed to navigate the complexities of modern emotional well-being. In a world grappling with rising stress, anxiety, and loneliness, SoulSpark offers a sanctuary – a **AAA indie quality**, 3D mobile experience built with **Three.js** that blends the **wonder of Ghibli-inspired natural worlds** with the **therapeutic power of connection**.

**Why SoulSpark?**

*   **Addressing a Need:** We believe mental wellness tools should be as engaging as they are effective. SoulSpark tackles the gap between simplistic mental health apps and deep, immersive games, offering a **non-judgmental space** for self-reflection and growth.
*   **The Power of Companionship:** At its heart, SoulSpark is about the bond between the player and their **Spark** – a customizable, AI-driven companion that learns, responds, and grows alongside the player, offering genuine emotional support and guidance.
*   **Therapeutic Gameplay:** We seamlessly integrate **evidence-based techniques** (like CBT prompts and mindfulness exercises) into core gameplay loops like exploration, light puzzles, and expressive mini-games, making mental wellness practices feel natural and rewarding.
*   **AAA Indie Quality:** We are committed to delivering a polished, performant, and visually stunning experience that stands shoulder-to-shoulder with the best indie titles, optimized for mobile accessibility.

## Core Features

*   **💖 The Spark Companion:**
    *   **Deep Customization:** Shape your Spark's appearance (colors, patterns, ethereal accessories) to reflect your personality.
    *   **Empathetic AI:** Engage in natural, supportive conversations powered by a lightweight LLM, receiving context-aware encouragement and CBT-based prompts.
    *   **Dynamic Evolution:** Watch your Spark visually change and react based on your shared journey and emotional state.
    *   **Bonding Mechanics:** Strengthen your connection through interaction, unlocking new abilities, dialogue, and cosmetic options.

*   **🌌 Enchanted Exploration:**
    *   **Living Worlds:** Traverse breathtaking 3D biomes rendered with Three.js – from serene Nebula Fields to reflective Crystal Canyons – each reacting subtly to your emotional state.
    *   **Discovery & Puzzles:** Uncover secrets, solve light environmental puzzles, and collect `Glow Orbs` representing processed emotions or positive affirmations.
    *   **Atmospheric Storytelling:** Piece together the lore of the Soul Cosmos and the Spark's origins through visual narratives and gentle guidance.

*   **🧘‍♀️ Therapeutic Mini-Games:**
    *   **LightSync:** A guided breathing exercise where players synchronize their breath with the Spark's pulsating light, calming both the Spark and the environment.
    *   **Orb Garden:** Cultivate a personal sanctuary by planting `Glow Orbs`, representing positive thoughts and memories, watching the garden flourish over time.
    *   **StarSong:** Create calming melodies and visual patterns by connecting stars in an interactive celestial canvas.

*   **✨ Visual Spectacle:**
    *   **Ghibli Meets Ethereal:** A unique art style blending lush, natural environments inspired by Studio Ghibli with the glowing, otherworldly nature of the Sparks.
    *   **Dynamic Effects:** Leveraging Three.js and custom shaders for vibrant particle effects, procedural generation, and responsive lighting.

*   **🌐 PWA Accessibility:** Delivered as a Progressive Web App for broad reach across iOS, Android, and web browsers.

## Target Aesthetic

Imagine stepping into a living painting – serene forests, cascading waterfalls, and mystical clearings bathed in soft, natural light. Now, picture a companion made of gentle, glowing energy, shifting and flowing with emotion. That's the visual heart of SoulSpark: **enchanting nature fused with ethereal light**.

## Technology Stack

*   **Core Engine:** [Three.js](https://threejs.org/) (r167+)
*   **Language:** JavaScript (ES6+)
*   **Platform:** Progressive Web App (PWA)
*   **(Future):** Lightweight LLM for dialogue, potential backend for social features/persistence.

## Current Status & Roadmap

SoulSpark is currently in the early stages of development (**Phase 0: Core Rendering & Stability**). Our immediate focus is establishing a stable rendering foundation and resolving core technical hurdles.

For a detailed breakdown of planned features and development phases, please see our [**ROADMAP.md**](ROADMAP.md).

## Getting Started (Development)

_(Prerequisites: Node.js, npm/yarn)_

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Mikebrown0409/Soul-Spark.git
    cd Soul-Spark
    ```
2.  **Install dependencies (if any added later):**
    ```bash
    # npm install  (or yarn install)
    ```
3.  **Run a local development server:**
    *   We recommend using a simple server that can handle module loading correctly. The [Vite](https://vitejs.dev/) dev server is excellent for Three.js projects, or use a basic option like `http-server` or Python's `http.server`.
    *   Example using `http-server` (install via `npm install -g http-server`):
        ```bash
        http-server . -o
        ```
    *   Navigate to `index.html` in your browser.

## Contributing

We believe in the power of collaboration to bring SoulSpark to life. While formal contribution guidelines are still under development, we welcome feedback and ideas. Please check the [Project Issues](https://github.com/Mikebrown0409/Soul-Spark/issues) tab (if active) or refer to documentation in the `/docs` folder.

---

_Let's build something meaningful together. ✨_ 