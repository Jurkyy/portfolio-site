---
title: ASCII Shooter
publishDate: 2024-20-11 00:00:00
img: /assets/ascii-shooter.png
img_alt: A screenshot of the ASCII shooter game showing the distinctive post-process rendering effect.
description: |
  A first-person shooter featuring Quake-style movement and a unique ASCII post-process rendering effect, built with Rust and Bevy.
tags:
  - Rust
  - Bevy
  - Game Dev
  - Shaders
size: Large
popularity: 79
---

ASCII Shooter is an ambitious game development project that combines classic FPS mechanics with a distinctive visual style. The game features Quake-inspired movement physics and renders everything through an ASCII post-process shader, creating a unique retro-futuristic aesthetic.

#### Quake-Style Movement

One of the most satisfying aspects of classic arena shooters is the movement system. This project implements the beloved Quake-style movement mechanics including:

* Bunny hopping for speed preservation
* Strafe jumping for acceleration
* Air control for mid-flight adjustments
* Responsive and tight controls that reward skillful play

Getting the physics to feel right required careful tuning and understanding of how the original Quake engine handled player movement.

#### ASCII Post-Process Rendering

The signature visual feature of this game is the ASCII rendering effect. Instead of displaying traditional graphics, the entire scene is converted to ASCII characters in real-time using a custom shader. This creates:

* A distinctive visual style reminiscent of early computer graphics
* Interesting gameplay challenges with reduced visual fidelity
* A technical showcase of post-processing techniques in Bevy

#### Built with Bevy

The game is built using Bevy, Rust's modern game engine. Working with Bevy has been a fantastic experience, offering:

* Entity Component System (ECS) architecture for clean game logic
* Excellent performance thanks to Rust's zero-cost abstractions
* A growing ecosystem of plugins and community support
* Hot reloading for rapid iteration during development

This project has been an incredible journey into game development, shader programming, and the intricacies of movement physics. It showcases what is possible when combining Rust's performance with creative visual techniques.

Check out the project on [GitHub](https://github.com/Jurkyy/ascii_shooter).
