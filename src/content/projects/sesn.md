---
title: "SESN: Scale-Equivariant Steerable Networks"
publishDate: 2021-02-04 00:00:00
img: /assets/SESN.gif
img_alt: Showcase of scale-equivariant scaling implemented based on ICLR 2020.
description: |
    We undertook the task of reproducing and extending the renowned research conducted by Ivan Sosnovik, Michał Szmaja, and Arnold Smeulders on "Scale-equivariant Steerable Networks."
tags:
  - Scale-equivariance
  - AI
  - Reproducibility
size: Medium
---

## Revolutionising work

> "Extraordinary claims require extraordinary evidence, and when it comes to reproducibility, there is no substitute for independent verification." - Carl Sagan

In the work [Scale-Equivariant Steerable Networks](https://arxiv.org/abs/1910.11093) (ICLR 2020), Ivan Sosnovik, Michał Szmaja, and Arnold Smeulders purportedly revolutionize the way we compute and stabilize equivariant scalability for image recognition. However, upon reading the paper, doubts arose regarding the accuracy of the showcased experiments and the theoretical validity of the proposed method. To address these concerns, Olaf Braakman and I decided to reproduce the research by re-implementing the proposed theory and conducting tests on well-known, publicly available datasets.

### Datasets

We selected the MNIST and STL-10 datasets, and specifically used a custom script to generate a modified version of the MNIST dataset called MNIST-scale, tailored to our experimental needs. These datasets provided a comprehensive testing ground to validate the veracity of the original findings.

### Implemenation

In order to thoroughly test the proposed method, we re-implemented various approaches for both scale-equivariant and local scale-invariant convolutions. We offer a clear outline in our code regarding the location of these implementations, enabling other researchers to explore our code and findings.

#### Github

This project is publicly available on GitHub, and you can access it [here](https://github.com/Jurkyy/SESN). We would like to acknowledge the original authors and their financial supporter in our work, as their contributions provided the necessary foundation for our reproduction efforts.
