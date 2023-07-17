---
title: SCA thesis
publishDate: 2022-21-04 00:00:00
img: /assets/sca-thesis.jpg
img_alt: A picture of the commandline interface of the SCA toolbox.
description: |
    Some groundbreaking research over attacking higher order univariate datasets in the field of SCA.
tags:
  - SCA
  - Higher-order univariate data
  - Thesis
---

I did research into how to improve the state-of-the-art breaking of hardware-based implementations, see the code I used [here](https://github.com/Jurkyy/ms-thesis.git) and the abstract of it below:

Side-Channel Attacks (SCA) attempt to recover the secret cryptographic key from an electronic device by exploiting the unintended physical leakages of said device. With the devices that are being attacked becoming more sophisticated, so is SCA. In the past few years, the focus of the research in the field of SCA shifted towards the application of the powerful method of Deep Learning (DL). DL SCA methods can operate in a similar way as before seen methods in the profiled setting, such as Template Attack. In the profiled setting, SCA first creates a profile on a copy of the target device, to then subsequently use that same profile to perform a more powerful attack on the target device. DL SCA has proven to be quite the effective method, even showcasing its success against implementations utilising countermeasures. However, as DL SCA is fairly novel there still exist gaps in the knowledge we have of how to make DL SCA effective in all possible situations. Most research bases itself on software-based implementations, whilst rarely hardware-based implementations are discussed as they are often seen as more difficult to attack. Our contribution in this work is to showcase the difference in difficulty between hardware-based implementations and software-based implementations that both use countermeasures. We explore the attack performance of several state-of-the-art methods on hardware-based implementations with countermeasures and give insight into why their performance is the way it is. We also attempt to make a base methodology for attacking hardware-based implementations, both with and without countermeasures, as the current field of research is lacking this. Showcasing our suggested methodology, we achieve better than state-of-the-art results on a hardware-based implementation with countermeasures and competitive with the state-of-the-art results on a hardware-based implementation without countermeasures.

If you're interested in reading the whole work, please checkout [the official thesis page on the Technical Univserity of Delft's repository](http://resolver.tudelft.nl/uuid:f7c20a8b-8fc2-4c94-a873-d9c8ac9239d0)