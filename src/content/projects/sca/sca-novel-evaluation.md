---
title: Novel Evaluation Metric
publishDate: 2021-09-04 00:00:00
img: /assets/novel-evaluation-metric.jpg
img_alt: A small overview of 100 and 200 epochs with a CNN architecture and MLP architecture, using the novel-evaluation metric on a software-based encryption power signal data-set.
description: |
    A paper written by two fellow students and I about a novel evaluation metric for SCA.
tags:
  - SCA
  - Keras Tensorflow
  - Deep learning
size: Medium
---
One of the more extensive projects I have done into Side-Channel Anaylsis (SCA) is into the evaluation metrics a Deep Learning Algorithm would to assess the performance and effectiveness of the model it procudes. In this work two former, fellow students (Sengim Karayalcin and Jari Bervoets) and I explore designing a more efficient self-developed metric called Log-Likelihood Ratio (LLR). You can find the code for this project [here](https://github.com/Jurkyy/novel-evaluation-metric) on Github. There you will find all the models that we used, and a setup explanation if you want to reproduce our results. You should also note that we have also extensively discussed our results in a paper we wrote, you can download it <a href="/assets/novel-evaluation-metric.pdf" download>here</a> and read the abstact below: 

The field of side channel analysis (SCA) has increasingly been using Deep Learning
to enhance the attacks. However, attack evaluation metrics, like Guessing Entropy
(GE) and Success Rate (SR), are computationally inefficient. Furthermore, traditional
Deep Learning metrics, like accuracy and precision, are not suitable for evaluating Deep
Learning models in the context of SCA, as classes are often imbalanced. However,
recently Zhang et al. have proposed a new evaluation metric for SCA, Cross Entropy
Ratio (CER), that provides a good indication of the success of the attack and is viable
to embed in Deep Learning Algorithms. Additionally this metric can be used as a loss
function to train better models when training data is imbalanced. Throughout this
report, a reproduction of the results of the paper introducing CER will be showcased,
and a self-developed metric, the Log-Likelihood Ratio (LLR), will be introduced as
well. These two metrics were compared to Cross Entropy (CROSS) and each other
as loss functions, using several neural network architectures and data-sets. The final
results of this report will showcase that CER, as a loss function, in the context of
SCA, when classes are imbalanced, is better than using regular Cross Entropy. LLR
performs slightly worse than CER in almost every scenario, but is generally better
than Cross Entropy. Therefore, this report shows that the results from Zhang et al.
are reproducible and the CER metric can be used as a evaluation metric to more accurately evaluate Deep Learning models.