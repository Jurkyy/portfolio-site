---
title: rcat
publishDate: 2022-08-08 00:00:00
img: /assets/rcat.jpg
img_alt: Demonstration of all the possible commands that rcat has to offer.
description: |
  rcat - A Rust Implementation of "cat"
tags:
  - Command Line Interface
  - cat
  - Rust
---

An implementation of the Linux command line tool "cat", written in Rust.


Usage: `rcat [OPTIONS] [FILE]`

OPTIONS:

| KEYWORD                     | Description                      |
| --------------------------- | -------------------------------- |
| -f, --filenames, --filename | Display the filenames            |
| -n, --number                | Number all the output lines      |
| -l, --newline               | Prints a newline after each file |
| -?, --help                  | Display this help and exit       |

One of my early projects in Rust that truly captivated me and deepened my love for the language was my personal reimplementation of the "cat" tool. In Unix-based terminals, "cat" is widely used to display the contents of a file. I recreated this tool in Rust, incorporating additional options and the ability to concatenate multiple files in a single command execution. You can explore the repository [here](https://github.com/Jurkyy/rcat).
