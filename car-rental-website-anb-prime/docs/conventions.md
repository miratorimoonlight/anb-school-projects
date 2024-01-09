# General

- Indentation: 2 spaces
- Naming rules: use lowercase with dash (-) NOT space
- Character Encoding: UTF-8
- Fonts: Roboto (400, 500, 700)
- Colors:
  - Primary Color: #ff4d30
  - Black Heading: #010103
  - Grey Paragraph: #706f7b
  - Black Bg Color: #2d2d2d
  - Lightgrey Bg Color: #f8f8f8
- **No inline CSS**
- **Note**: Some of the rules are already defined in `settings.json` file.

# Project folder structure

Project name: **_car-rental-website-anb-prime_**

```
|--- css
|    |--- common.css
|    |--- about.css
|    |--- contact.css
|    |--- index.css
|    |--- models.css
|    |--- ourteam.css
|    |--- testimonials.css
|
|--- docs
|    |--- conventions.md
|
|--- images
|
|--- js
|    |--- script.js
|
|--- about.html
|--- contact.html
|--- index.html
|--- models.html
|--- ourteam.html
|--- testimonials.html
|--- README.md

```

# Must Follow:

## 1. Link CSS

Every html file must link common.css.  
Example: index.html

```html
<link rel="stylesheet" href="css/common.css" />
<link rel="stylesheet" href="css/index.css" />
```

## 2. Container width

Every element that is right below `<body>` element must have these classes:

- `.w-full` on parent element - the one right below `<body>`
- `.w-lg`, `.w-md`, `.w-sm` on child element.

## 3. Margin of each section

Every element that is right under `<body>` element must have these margin classes:

- `.margin-x` = to center the element
- `.margin-y` = to add margin on top and bottom of the element.

Example:

```html
<body>
  <section class="w-full margin-x margin-y">
    <div class="w-lg w-md w-sm"></div>
  </section>
</body>
```

# Buttons:

## 1. Primary button

### 1.1. Overview

Normal red button has only red color and text

### 1.2. How to use

- Class names:

  - `.btn`
  - `.btn-primary` for primary red button
  - `.btn-secondary` for secondary black button

- Example:
  ```html
  <button class="btn btn-primary">Click me</button>
  ```

## 2. Button with icon

### 2.1. Overview

Buttons with icon can have icon on the left or right side of it

### 2.2. How to use

- Example:
  ```html
  <button class="btn btn-primary">Click me <i>...</i></button>
  ```

# Typography:

## 1. General convention:

- Global line height = 1.5rem

## 2. Small title

### 2.1. Overview

Small title is used in many sections

### 2.2. How to use

- class name: `.small-title`

### 2.3. Characteristics

- Color code: #010103
- Font size: 22px
- Font weight: 500

## 3. Big title

### 3.1. Overview

Big title is mostly placed under small titles.

### 3.2. How to use

- class name: `.big-title`

### 3.3. Characteristics

- Font size: 42px
- Font weight: 700
- Color code: #010103

## 4. Paragraph

### 4.1. Overview

Paragraph is mostly placed under big titles.

### 4.2. How to use

- class name: `.paragraph`

### 4.3. Characteristics

- Color code: #706f7b
- Font size: 16px
- Font weight: 400

# Grid System

## 1. Class names

- `.grid`
- `.col-3`, `.col-2`, `.col-1`
- `.place-center`
- `.gap-x-12` = gap left and right 12px
- `.gap-y-12` = gap top and bottom 12px
- `.gap-12` = gap 12px
- `.gap-x-32` = gap left and right 32px
- `.gap-y-32` = gap top and bottom 32px
- `.gap-32` = gap 32px

## 2. How to use

```html
<div class="grid col-1 col-2 col-3">
  <div>...</div>
  <div>...</div>
  <div>...</div>
</div>
```

# Flex

## 1. Class names

- `.flex`
- `.justify-center`
- `.align-center`
- `.flex-col` = flex direction column

## 2. How to use

```html
<div class="flex gap-12">
  <div>...</div>
  <div>...</div>
  <div>...</div>
</div>
```
