---
title: Metaball
publishDate: 2024-05-03 00:00:00
img: /assets/metaball.gif
img_alt: ASCII metaball animation rendered in the terminal.
description: |
  An ASCII metaball animation for the terminal, bringing organic blob-like shapes to life using Rust.
tags:
  - Rust
  - ANSI
  - Math
size: Small
popularity: 80
---

Metaball is a terminal-based animation that renders organic, blob-like shapes using ASCII characters. Similar to my Spinny Cube project, this is an exploration of mathematical visualization in the command line, this time focusing on the fascinating world of metaballs.

#### What are Metaballs?

Metaballs are organic-looking shapes commonly used in computer graphics. They are defined by implicit surfaces where multiple point sources create a combined field. When the field strength exceeds a threshold, the surface is rendered, creating smooth, blobby shapes that merge and separate fluidly.

The mathematical foundation involves calculating the field strength at each point in space based on the distance to each metaball center:

```
field(x, y) = sum(radius_i^2 / distance_i^2)
```

When this field exceeds a threshold value, that point is considered "inside" the metaball surface.

#### Terminal Rendering

The animation renders to the terminal using ANSI escape codes for:

* Clearing and repositioning the cursor
* Smooth frame updates without flickering
* ASCII character selection based on field intensity

Different characters represent different field strengths, creating a gradient effect that adds depth to the visualization.

#### Why Rust?

Rust's performance characteristics make it ideal for real-time terminal animations. The low-level control over memory and the absence of garbage collection pauses ensure smooth, consistent frame rates even with complex calculations.

This project continues my exploration of bringing mathematical concepts to life in the terminal. You can find the source code on [GitHub](https://github.com/Jurkyy/metaball).
