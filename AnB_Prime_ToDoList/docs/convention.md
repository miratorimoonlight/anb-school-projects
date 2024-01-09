# Table of content

- [General](#general)
- [Project structure](#project-structure)
- [Project setup](#project-setup-guide)
- [Naming convention](#naming-convention)
- [Component structure](#component-structure)
- [Annotation rule](#annotation-rule)
- [HTML semantic rule](#html-semantic-guide)
- [State management](#state-management)
- [Modal component](#modal)
- [TaskCard component](#task-card)

# General

- `main.css` must be on top so that it has lower power than specific components.  
  Example:

  ```jsx
  import "./main.css";
  import App from "./App/App";
  ```

- CSS reset is used to remove default style of the browser. CSS reset can be found in [main.css](/src/main.css).

- Colors:

  - primary-color: `#424c55`
  - secondary-color: `#f5edf0`
  - third-brown: `#886f68`
  - fourth-brown: `#3d2c2e`
  - lavender: `#d1ccdc`
  - green: `#219653`
  - danger: `#bc4b51`

- Font:

  - Font family: `Lato`
  - Font weight: `300`, `400` and `700`
  - Title font size: `40px`
  - Paragraph font size: `16px`

- No inline CSS

# Project structure

```
|--- docs/
|    |--- convention.md
|
|--- public/
|
|--- src/
|    |--- assets/
|    |    |--- favicon.png
|    |
|    |--- components/
|    |    |--- App/
|    |    |--- AddButton/
|    |    |--- AddField/
|    |    |--- DeleteModal/
|    |    |--- DetailField/
|    |    |--- TaskCard/
|    |    |--- TaskList/
|    |
|    |--- store/
|    |--- main.css
|    |--- main.jsx
|
|--- index.html
|--- package.json
```

- `docs` folder contains documentations like `convention.md`
- `src` folder is where most of coding is done. It contains the root component `main.jsx` and its css `main.css`, and many other files/components:
  - `assets` folder contains images
  - `components` folder contains all react components. Each component has its corresponding css file.  
    **Example:** in `TaskCard` folder, there are `TaskCard.jsx` and `TaskCard.css`
    ```
    |--- TaskCard/
    |    |--- TaskCard.css
    |    |--- TaskCard.jsx
    ```

# Project setup guide

- Use `nvm` tool to easily manage nodejs versions and to ensure a consistent version. Guide to setup nvm is [here](https://github.com/nvm-sh/nvm#installing-and-updating).
- Make sure you are on **Node.js** version `18.17.0`. Run `node -v` in the terminal to check.
- Use `yarn` as a package manager. To enable `yarn`, run `corepack enable` in the terminal.
- Clone the project from GitHub.
- `cd` to the project folder and run `yarn` in the terminal to install project dependencies.
- **To run dev server**, run `yarn dev`.
- **To build for production**, run `yarn build`. It will generate html, css, js and other assets in a folder called `dist` that you can deploy.

# Naming Convention

- **Components**: PascalCase for component file names and component names. Example: `AddButton.jsx`.
- **Functions and Variables**: camelCase. Example: `function fooBar(){...}`
- **Files**: lowercase and hyphen-separated words for files other than components. Example: `index.js`.
- **CSS class**: small letter with dash. Example: `.add-btn`
- **Constants**: UPPERCASE for constants. Example: `const PI = 3.14`

# Component Structure

This app uses functional components with hooks. Each component must look like this:

```jsx
// 1. Imports
import { useState, useEffect } from "react";

// 2. Component
const CompoName = ({ ...props }) => {
  // 2.1. Hook functions
  const [state, setState] = useState();
  useEffect(() => {
    // ...
  }, []);

  // 2.2. Functions
  const handleSomething = () => {
    // ...
  };

  // 2.3. Component implementation
  return (
    <>
      <div>Lorem ipsum...</div>
      <main>{/* ... */}</main>
    </>
  );
};
```

# Annotation rule

This section elaborates on how to write comment as well as documentation:

- Use `//` for single line comment.
- Use `{/* comment here... */}` to comment inside jsx.
- Use **jsdoc syntax** for multiline comment as well as documentation:
  - Example:
    ```javascript
    /*
     * Multi line
     * comment
     */
    ```

# HTML semantic guide

**Semantic Markup** is a vital practice for developers because, although no errors are thrown, it helps with accessibility, readability, maintainability and more.

- Use lower case for native HTML tag. No upper case or mixed.
  Example:

  ```html
  <!-- This is right -->
  <section>...</section>
  ```

- Use as many semantic tags as possible. Some of the semantic tags are:
  - `<section>`
  - `<header>`
  - `<footer>`
  - `<main>`
  - `<nav>`

# State Management:

This app uses [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction) library for state management. It is a small, fast and scalable bearbone state management solution.  
Below is how states in my todo app look like:

```jsx
tasks = [
  {
    id: <uuid>,
    task: <str>,
    isDone: <bool>
  }
]

showAddModal = <bool>
detailTaskID = <uuid>
taskIDToBeDel = <uuid>
```

- `tasks` is a list of objects. It contain all the tasks/todos in the app.
- `showAddModal` is a boolean state that is responsible for toggling the [AddField](/src/components/AddField/AddField.jsx) component.
- `detailTaskID` is used for toggling [DetailField](/src/components/DetailField/DetailField.jsx) component as well as for viewing each todo detail and edit logic.
- `taskIDToBeDel` is used for toggling [DeleteModal](/src/components/DeleteModal/DeleteModal.jsx) component and for delete confirmation logic.

# Modal

Modal is a UI component that pops up and need user's focus and attention.  
My todolist app uses modal in:

- Add new todo field ( `AddField.jsx` )
- Detail and Edit field ( `DetailField.jsx` )
- Delete confirmation ( `DeleteModal.jsx` )
  ![modal](/src/assets/modal-img.png)

## 1. Basic Modal Styling

The common styling can be found in [App.css](/src/components/App/App.css)

- `.modal-container`
- `.modal-card-wrapper`
- `.modal-detail-view`
- `.modal-btn-group`

## 2. How to use

Example:

```jsx
<div className="modal-container" onClick={handleCloseModal}>
  // CSSTransition is needed to add animation
  <CSSTransition in={isStartTransition} timeout={0} classNames="modalcard">
    <div className="modal-card-wrapper" onClick={(e) => e.stopPropagation()}>
      <div className="modal-detail-view">...</div>
      <div className="task-btn-group modal-btn-group">
        <button>...</button>
        <button>...</button>
      </div>
    </div>
  </CSSTransition>
</div>
```

# Task Card

Task card is a reusable component.  
![task-card](/src/assets/card-img.png)

## 1. Basic task card styling and props

Styles:

- `.task-card`
- `.task-btn-group`

Props:

- `id`: uuid
- `title`: string
- `isDone`: boolean

Task card component structure:

```jsx
const TaskCard = ({ id, title, isDone }) => {
  return (
    <div className="task-card">
      <p>...</p>
      <div className="task-btn-group">
        <button id="done-btn">...</button>
        <button id="del-btn">...</button>
      </div>
    </div>
  );
};
```

## 2. How to use

Add `<TaskCard />` in your desired component, and pass the props accordingly.

Example: Usage inside `TaskList.jsx`:

```jsx
<main className="task-list">
  {filteredTasks?.map((item) => (
    <TaskCard
      id={item.id}
      key={item.id}
      title={item.task}
      isDone={item.isDone}
    />
  ))}
</main>
```
