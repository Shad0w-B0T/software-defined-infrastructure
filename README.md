# Software Defined Infrastructure

sommersemester 2025

dr092
fk126

## About the Documentation

The documentation is written in a "code-as-documentation" style. We use VitePress for this purpose, 
as tools like MkDocs or Sphinx would be overkill for our use case.
It combines both a practical guide and task-based instructions.

## How to View the Documentation

You can either view it via GitLab Pages:

👉 https://docs-334651.pages.mi.hdm-stuttgart.de/

or run it locally:

### 1. Clone the repository

```bash
git clone https://gitlab.mi.hdm-stuttgart.de/sdi-g03/docs
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run docs:dev
```
This will give you a live preview.

### 4. Build the static site

```bash
npm run docs:build
```
This will generate the static files for deployment.
