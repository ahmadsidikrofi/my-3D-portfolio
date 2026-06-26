# 🚀 Ahmad Sidik Rofiudin - Personal Portfolio

![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-4A4A55?style=for-the-badge&logo=framer)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock)
![Three.js](https://img.shields.io/badge/Three.js-Black?style=for-the-badge&logo=three.js)

Welcome to the source code of my interactive 3D Web Portfolio! This project is far more than a standard resume—it is a playground of **experimental UI/UX**, **micro-interactions**, and **bold design philosophies**. 

Built to demonstrate high-level frontend engineering, it merges 3D WebGL environments with cutting-edge CSS layouts and complex animation orchestrations.

---

## 🎨 Dual-Theme Design Philosophy

This portfolio intentionally splits its personality into two distinct aesthetic dimensions based on the routing structure:

1. **The Dreamy Canvas (Home `/`)**
   - **Style:** Glassmorphism, Airy, Spatial.
   - **Experience:** A serene 3D floating island built with `@react-three/fiber`. Users navigate by clicking physics-defying floating balloons that pop satisfyingly upon interaction.

2. **The Bold Brutalism (`/about`, `/projects`, `/contact`)**
   - **Style:** Neo-Brutalism (inspired by *The Verge*).
   - **Experience:** High-contrast colors, harsh shadows (`shadow-[6px_6px_0_0_#000]`), thick borders, and raw typography. Designed to be highly legible, punchy, and structurally rigid.

**Why the split personality?**  
As a developer, I wanted to showcase versatility. The 'Dreamy' home page serves as an immersive, creative hook that captures attention and demonstrates complex WebGL/3D animation capabilities. However, once the user dives into the actual content (About, Projects, Contact), the aesthetic intentionally shifts to 'Neo-Brutalism'. This ensures that readability, accessibility, and straightforward UX take absolute priority when delivering important information—proving that I can balance both artistic flair and highly functional, pragmatic design.

---

## ✨ Key Features & Architectural Highlights

### 🎵 Custom Multi-Theme Music Player (Global Audio)
A seamless music player experience powered by the Context API. The music does not restart when changing routes!
- **DreamyAudioPlayer:** A sleek, glass-morphed capsule featuring a spinning vinyl record and smart hover-to-expand mechanics (adapted to click-to-expand for mobile).
- **BrutalistAudioPlayer:** The exact same functionality but wrapped in a heavy, Neo-Brutalist armor for the sub-pages. 

### 🎈 Interactive Popping Balloons
On the home screen, navigation is driven by floating balloons. Click them, and they don't just route you—they **pop** with an instant expansion, shooting out 8 directional particles, before smoothly navigating you to the next page. 

### 🗂️ Staggered GSAP Menus
The main navigation sidebars (`StaggeredMenu` & `TheVergeMenu`) utilize GSAP timelines for complex, staggering entrance animations. 
- *Performance Note:* Custom CSS visibility/opacity techniques are implemented to prevent the dreaded **FOUC** (Flash of Unstyled Content) before GSAP initializes.

### 🃏 3D ScrollStack Cards
In the Projects section, project cards are stacked and pinned during scroll. As users scroll through them, custom audio cues (`card-flip.mp3`) trigger asynchronously, timed perfectly with the Intersection Observer and scroll progress.

### 🥚 Hidden Easter Eggs
- **"Caught in 4K":** Hovering over the profile picture (`InteractiveProfilePic.jsx`) for more than 3 seconds triggers a secret UI state accompanied by a premium airhorn sound effect.
- **Spotlight Meme Finder:** A custom intersection-based mini-game embedded directly into the projects page.

---

## 🛠️ Tech Stack & Libraries

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **3D Rendering:** [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction) & Drei
- **Animations:** 
  - [Framer Motion](https://www.framer.com/motion/) (for physics-based micro-interactions)
  - [GSAP](https://gsap.com/) (for complex, timeline-based layout shifts)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Audio:** `use-sound` + Context API + Native HTML5 Audio

---

## 🚀 Getting Started

To run this project locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ahmadsidikrofi/my-3D-portfolio.git
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Explore:** Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 💡 Performance Optimizations Applied

- **Lazy Loading 3D Assets:** The heavy WebGL canvas (`<Canvas>`) and models are wrapped in `Suspense` with a custom Brutalist Loader sequence.
- **Event Throttling:** Expensive DOM queries (`getBoundingClientRect`) during scroll sequences are optimized with direct coordinate math and layout debouncing.
- **DOM Stability:** Components like the `GhostCursor` are memory-heavy WebGL objects; they are strictly guarded by `hasMouseEntered` logic to prevent layout thrashing on mobile devices.

---

> *"Design is not just what it looks like and feels like. Design is how it works."*  
> Feel free to explore the code, borrow some components, or reach out to me!
