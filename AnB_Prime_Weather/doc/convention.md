# Table of content

- [General](#general)
- [Setup guide](#project-setup-guide)
- [Project structure](#project-structure)
- [Naming convention](#naming-convention)
- [Component structure](#component-structure)
- [Annotation rule](#annotation-rule)
- [HTML semantic tags](#html-semantic-guide)
- [State management](#state-management)
- [Reusable components](#reusable-components)

# General

- `main.css` must be on top so that it has lower power than specific components.  
  Example:

  ```jsx
  import "./main.css";
  import App from "./App";
  ```

- CSS reset is used to remove default style of the browser. CSS reset can be found in [main.css](/src/main.css).

- Colors:

  - primary-color: `#FFFFFF`
  - secondary-color: `#3B6379`
  - light-blue: `#DEF8FF`
  - brown: `#79573B`

- Font:

  - Font family: `Poppins`
  - Font weight: `300`, `400` and `700`
  - main temperature font size: `42px`
  - country font size: `20px`
  - Paragraph font size: `16px`
  - Additional info font size: `12px`
  - Additional info title font size: `8px`

# Project setup guide

- Use `nvm` tool to easily manage nodejs versions and to ensure a consistent version. Guide to setup nvm is [here](https://github.com/nvm-sh/nvm#installing-and-updating).
- Make sure you are on **Node.js** version `18.17.0`. Run `node -v` in the terminal to check.
- Use `yarn` as a package manager. To enable `yarn`, run `corepack enable` in the terminal.
- Clone the project from GitHub.
- `cd` to the project folder and run `yarn` in the terminal to install project dependencies.
- **To run dev server**, run `yarn dev`.
- **To build for production**, run `yarn build`. It will generate html, css, js and other assets in a folder called `dist` that you can deploy.

# Project Structure

```
|--- doc/
|    |--- convention.md
|
|--- public/
|
|--- src/
|    |--- api/
|    |    |--- setup.js
|    |    |--- weatherAPI.js
|    |    |--- locationAPI.js
|    |
|    |--- assets/
|    |    |--- weather-icons/
|    |    |--- others/
|    |
|    |--- components/
|    |    |--- AnimatedNum/
|    |    |--- DayTemp/
|    |    |--- ErrorUI/
|    |    |--- MainLoadingSpinner/
|    |    |--- MainTemp/
|    |    |--- Search/
|    |
|    |--- store/
|    |--- App.css
|    |--- App.jsx
|    |--- main.css
|    |--- main.jsx
|
|--- index.html
|--- package.json
```

- `doc` folder contains documentations like `convention.md`
- `src` folder is where most of coding is done. It contains the root component `main.jsx` and its css `main.css`, and many other files/components:
  - `assets` folder contains images
  - `components` folder contains all react components. Each component has its corresponding css file.
    - **Example:** in `DayTemp` folder, there are `index.jsx` and `DayTemp.css`
      ```
      |--- DayTemp/
      |    |--- DayTemp.css
      |    |--- index.jsx
      ```

# Naming Convention

- **Components**: PascalCase for component file names and component names. Example: `AddButton.jsx`.
- **Functions and Variables**: camelCase. Example: `function fooBar(){...}`
- **Files**: lowercase and hyphen-separated words for files other than components. Example: `index.js`.
- **CSS class**: small letter with dash. Example: `.add-btn`
- **Constants**: UPPERCASE for constants. Example: `const PI = 3.14`

# Component Structure

This app uses functional components with hooks (For example: `useEffect`). Each component must look like this:

```jsx
// Inside 'Example.jsx' file

// 1. 👇Imports
import { useState, useEffect } from "react";

// 2. 👇Component
const Example = ({ ...props }) => {
  // 2.1. 👇Hook functions
  const [state, setState] = useState();
  useEffect(() => {
    // ...
  }, []);

  // 2.2. 👇Functions
  const handleSomething = () => {
    // ...
  };

  // 2.3. 👇Component UI
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
- Use **jsdoc syntax** for multiline comment and documentation:
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

This app uses [zustand](https://docs.pmnd.rs/zustand/getting-started/introduction) library for state management. It is a small, fast and scalable barebone state management solution.  
Below is how states in my weather app look like:

```jsx
mainWeather: {
  temp,
  feelsLike,
  windSpeed,
  icon,
  description,
  name,
},
fourDayWeather: [
  {
    temp,
    day,
    icon,
  },
  {
    temp,
    day,
    icon,
  },...
],
chosenLoc: {
  txt,
  lat,
  lon
},
error: {
  code,
  msg
},
isLoading: bool
```

- `mainWeather` is an object that contains data for showing the main current weather information of the chosen location (`chosenLoc`).
- `fourDayWeather` is an array of weather objects that contains weather data of the next 4 days of the chosen location (`chosenLoc`).
- `chosenLoc` is an object that contains location name (`txt`), latitude (`lat`) and longitude (`lon`). When user search for a location and choose it, the location data will stored in the `chosenLoc` state.
- `error` is an object that stores error to be shown to user when there is an error occurs.
- `isLoading` is a boolean state that is used to show loading spinner when user request is being processed (Ex: when fetching weather data).

# Reusable Components

## 1. Overview

![img](/src/assets/others/reusable-components.png)

In my weather app, there are 2 reusable components:

- `DayTemp` component (which can be found in [/src/components/DayTemp](/src/components/DayTemp/index.jsx))
- `AnimatedNum` component (which can be found in [/src/components/AnimatedNum](/src/components/AnimatedNum/index.jsx))

## 2. `DayTemp` Component

### 2.1. Overview

`DayTemp` component is used to display the weather forecast of the next 4 days. It plays an important role in this app as it provides insights to the users helping them planning their activities accordingly.

The component has 3 props:

- `day` is the day of the week (string).
- `icon` is the icon code (string) (Ex: `01d` is clear sky in the day ). [Learn more](https://openweathermap.org/weather-conditions).
- `temp` is the temperature (number).

### 2.2. How to use it

Example usage in `App.jsx`:

```jsx
// 1. Import the component
import DayTemp from "./components/DayTemp";

const App = () => {
  const fourWeather = []

  // 2. Implement the component
  return (
    <>
      ...
      {

        fourWeather.map((each, idx) => {
          // 3. Add key props for best practice and to avoid warning
          return (
            <DayTemp
              key={idx}
              day={each.day}
              icon={each.icon}
              temp={each.temp}
            >
          )
        })
      }
      ...
    </DayTemp>
  )
}
```

## 3. `AnimatedNum` Component

### 3.1. Overview

`AnimatedNum` is used to display temperature information. Its animation functionality is captivating, as it adjusts the displayed number, starting from zero and smoothly progressing until it accurately reflects the real-time temperature. For instance, if the current temperature is `23°c`, the `AnimatedNum` will transition from `0` and gracefully increase until it precisely displays `23`.

The component has only 1 props:

- `n` is the number to be animated (in my case, it is the temperature.)

### 3.2. How to use it

Example usage in `MainTemp` component:

```jsx
// In '/src/components/MainTemp/index.jsx' file

// 1. Import AnimatedNum
import AnimatedNum from "../AnimatedNum";

// 2. Implement the component
const MainTemp = () => {

  return (
    <animated.main>
      ...
      <AnimatedNum n={mainWeather.temp}>
      ...
    </animated.main>
  )
}

```
