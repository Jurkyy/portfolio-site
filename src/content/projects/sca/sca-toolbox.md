---
title: SCA Toolbox
publishDate: 2020-21-04 00:00:00
img: /assets/sca-toolbox.jpg
img_alt: A picture of the commandline interface of the SCA toolbox.
description: |
    A toolbox, implementing several different types of side-channel attacks, making research significantly easier.
tags:
  - SCA
  - CLI
  - Research
---
In this project, we built a toolbox providing many different SCA tools, some of which attack implementations, analysis tools and evaluation metrics. Even a sub tool that simulates certain countermeasures into datasets for more in depth research on higher-order encryption implementations. The project was rather successful, seeing a significant amount of forks and stars on this repo and even the publishment of this toolbox by a security researching lab, called AISyLab. The code, including a detailed explanation of features and usage of the project can be found [here](https://github.com/AISyLab/side-channel-analysis-toolbox).

### Features

**Different Side-channel attacks:**

- Template attack (TA)
- Pooled template attack (PTA)
- Stochastic attack (SA)
- Mutual information analysis (MIA)
- online Correlation Power Analysis (oCPA)
- Direct Power Analysis (DPA)

**Analysis tools included in current version:**

- Normalized Inter Class Variance analysis (NICV)
- Pearson Correlation Analysis (PIA)
- Signal to Noise Ratio (SNR)
- non-Linear Regression Analysis (nLRA)
- Sum Of Squared T-values (SOST)
- Sum Of Squared Differences (SOSD)
- Test Vector Leakage Assessment (TVLA)
  
**Other features include:**

- Logging of sub result
- Aligning traces
- Full control over feature selection
- Introducing desync into datasets
- Progressbar
- GPU support