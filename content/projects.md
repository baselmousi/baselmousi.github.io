# Projects

<!-- Source of truth for the Projects page.
     featured: true  -> shown as a large card (and optionally on the homepage)
     papers: BibTeX keys from publications.bib, newest first. The site renders each one as a
             short citation (title, venue badge, links) pulled from the .bib, and tags the paper
             on the Publications page with the project's name. Paper links live in the .bib only.
     links: non-paper links only (code, dataset, demo, case study).
     Links marked TODO: add the URL or delete the line. Never let the site invent a link.
     image: put files in content/images/ (a screenshot, demo GIF, or a figure from the paper). -->

## Featured

### Reliability of Multilingual Multimodal Models
- **one_liner:** Where vision- and speech-language models fail across languages, modalities and cultures.
- **description:** Studies how multimodal models break when inputs move beyond English and text. Introduced M2CQA, a culturally grounded benchmark built from images spanning 17 MENA countries with true and counterfactual statements in English, Arabic and its dialects, along with the CounterFactual Hallucination Rate (CFHR), which measures hallucination beyond raw accuracy. Also studies how model behavior shifts when the same input is spoken rather than read.
- **role:** Team Lead
- **org:** QCRI
- **tags:** Multimodal LLMs, Hallucination, Speech, Arabic NLP, Culture
- **papers:** mousi2026said, mousi2026once
- **links:** dataset: https://huggingface.co/datasets/QCRI/M2CQA
- **image:** images/hallucination.png
- **featured:** true

### Shaheen: Machine Translation for Arabic
- **one_liner:** English↔Arabic and dialectal machine translation models used to generate training data for Fanar.
- **description:** Developed English–Arabic translation models that outperformed commercial systems such as Google Translate, along with low-resource models that translate from English and Arabic into several Arabic dialects. The models were used by Fanar, QCRI's Arabic-centric generative AI platform, to generate synthetic data for pretraining and supervised fine-tuning.
- **role:** Developer
- **org:** QCRI
- **tags:** Machine Translation, Arabic NLP, Low-Resource, Dialects
- **papers:** abbas2026fanar, fanarteam2025fanar
- **image:** images/shaheen_logo.png
- **featured:** true

### LLMeBench
- **one_liner:** An open-source framework for benchmarking LLMs on any NLP task, in any language.
- **description:** Contributed to a framework for evaluating the zero- and few-shot capabilities of LLMs across NLP tasks. It offers generic dataset loaders, multiple model providers and standard metrics, and was tested with 53 datasets in 12 languages, yielding 200 ready-to-run benchmarking assets. Published at EACL 2024 (System Demonstrations).
- **role:** Core Contributor
- **org:** QCRI
- **tags:** LLM Evaluation, Benchmarking, Open Source
- **papers:** dalvi2024llmebench, abdelali2024larabench
- **links:** code: https://github.com/qcri/LLMeBench
- **image:** images/llemebench.png
- **featured:** true

### NeuroX: Interpretability Toolkit
- **one_liner:** A toolkit for analyzing and interpreting what neurons and latent concepts in language models encode.
- **description:** Used LLMs to annotate latent concepts inside pretrained language models (EMNLP 2023), analyzed cross-lingual alignment in multilingual models (ACL 2024), devised synthetic-data methods to compare neuron-ranking algorithms, and extended the Latent Concepts Framework to multimodal and speech models (Interspeech 2025). Also built interactive visualization and annotation web apps to communicate findings.
- **role:** Core Team Member
- **org:** QCRI
- **tags:** Interpretability, Multilingual Models, Visualization
- **papers:** ersoy2025words, mousi2024exploring, mousi2023can
- **image:** images/neurox.png
- **featured:** true

### AraDiCE: Arabic Dialect and Cultural Evaluation
- **one_liner:** Benchmarks testing how well LLMs handle Arabic dialects and regional cultural knowledge.
- **description:** Led the development of benchmarks for dialect comprehension and generation, built with machine translation plus human post-editing, and a fine-grained cultural-awareness benchmark covering the Gulf, Egypt and the Levant. Published at COLING 2025, with datasets and dialectal translation models released.
- **role:** Team Lead
- **org:** QCRI
- **tags:** Benchmarks, Arabic NLP, Dialects, Culture
- **papers:** mousi2025aradice
- **links:** dataset: https://huggingface.co/datasets/QCRI/AraDiCE
- **image:** images/Aradice.png
- **featured:** true

## Research projects

### Multilingual Knowledge Editing
- **one_liner:** Making factual edits to LLMs carry over across languages.
- **description:** Led the first comprehensive multilingual evaluation of knowledge-editing techniques and extended the Learning-to-Edit framework to multilingual self-editing LLMs through supervised fine-tuning. Resulted in a study of knowledge editing for Arabic (ArabicNLP 2025) and a survey of multilingual knowledge editing (EMNLP 2025).
- **role:** Team Lead
- **org:** QCRI
- **tags:** Knowledge Editing, Multilingual LLMs
- **papers:** durrani2025editing, mousi2025exploration
- **featured:** false

### Simultaneous Speech Translation
- **one_liner:** Real-time English↔Arabic speech translation.
- **description:** Led the development of English→Arabic and Arabic→English simultaneous speech translation systems, achieving state-of-the-art results.
- **role:** Team Lead
- **org:** QCRI
- **tags:** Speech Translation, Arabic, Real-Time
- **links:** demo: TODO
- **featured:** false

### Multilingual Reasoning
- **one_liner:** Why LLM reasoning breaks down outside English, and how to fix it.
- **description:** Designed and implemented algorithms to improve multilingual reasoning in LLMs, and ran a large-scale investigation of reasoning failures and the limits of cross-lingual generalization.
- **role:** Team Lead
- **org:** QCRI
- **tags:** Reasoning, Multilingual LLMs
- **papers:** <!-- none yet: add the key once a paper or preprint is in publications.bib -->
- **featured:** false

### AI-Assisted Collaborative Mapping Tool
- **one_liner:** Segmenting aerial imagery to support collaborative mapping.
- **description:** Managed a team of 10 machine learning engineers to deliver a Python package for aerial image processing, along with five U-Net segmentation models tailored to five regions. Built through an Omdena AI innovation challenge.
- **role:** Team Manager
- **org:** Omdena
- **tags:** Computer Vision, Segmentation, Remote Sensing
- **links:** case study: https://www.omdena.com/blog/ai-assisted-collaborative-mapping-tool-with-humanitarian-openstreetmap
- **featured:** false

## Earlier work

<!-- Optional: show as a compact list rather than cards, or leave off the site. -->

### APQ: Joint Architecture Search, Pruning and Quantization
- **one_liner:** Building latency and energy predictors for joint neural architecture search, pruning and quantization.
- **org:** University of California, Irvine
- **period:** Sept 2021 – Dec 2021
- **tags:** Efficient ML, NAS, Hardware-Aware ML

### Predicting Movement Time in 3D Virtual Environments
- **one_liner:** Analyzing and predicting user movement time in 3D virtual environments with ML models.
- **org:** University of Virginia
- **period:** May 2021 – Sept 2021
- **tags:** HCI, Machine Learning

### Car Classification in Highway Surveillance
- **one_liner:** Building a dataset and classifiers for car make, model and color from highway footage.
- **org:** Zaka
- **period:** May 2020 – Sept 2020
- **tags:** Computer Vision, Image Classification
