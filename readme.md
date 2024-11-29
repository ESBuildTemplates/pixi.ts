# PixiJS TypeScript Template

A modern template for PixiJS development with TypeScript and Rollup.

## Features

- [PixiJS](https://pixijs.com/) v8
- [Rollup](https://rollupjs.org/) for efficient bundling
- [TypeScript](https://www.typescriptlang.org/) with ESM and latest ECMAScript features
- Hot Module Reloading for fast development
- Prettier for code formatting

## Project Structure

- [src/](src/)
  - [app/](src/app/)
    - [sketch.ts](src/app/sketch.ts) - Game setup and update loop. Edit it!
  - [core/](src/core/)
    - [game.ts](src/core/game.ts) - Game methods and utilities. Add your own!
    - [keyboard.ts](src/core/keyboard.ts) - Keyboard and mouse inputs handling
  - [index.ts](src/index.ts) - Main entry point

## Getting Started

1. Clone this repository (or [use this template](https://github.com/ESBuildTemplates/ts-pixi/generate))
2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm start
```

4. Build for production:
```bash
npm run build
```

## Documentation

### core/game.ts

The file `game.ts` contains essential components for game management:

- **Main Components**
  - `app`: Main PixiJS application instance
  - `mouse`: Point representing mouse position
  - `ticker`: Shared game loop manager
  - `container`: Main application stage

- **Time Management**
  - `getDeltaTime()`: Returns time elapsed since last frame in seconds
  - `getOscillation(duration, amplitude)`: Creates a sinusoidal oscillation with given duration and amplitude

- **Sprite Management**
  - `getSprite(name)`: Loads and returns a sprite from assets
  - `getAnimatedSprite(name, options)`: Loads and returns an animated sprite from assets
  - `resizeAsBackground(sprite)`: Resizes a sprite to cover the screen

- **Utilities**
  - `toRadians(degrees)` / `toDegrees(radians)`: Angle conversion
  - `dist(a, b)`: Calculates distance between two points
  - `getWidth()` / `getHeight()`: Window dimensions
  - `pause()` / `play()` / `isPaused()`: Game loop control

### core/keyboard.ts

The file `keyboard.ts` handles keyboard inputs:

- **Key Class**
  - Manages key states (pressed/released)
  - Emits events on state changes
  - Tracks key press duration

- **Predefined Keys**
  - `up`, `down`, `left`, `right`: Directional keys
  - `space`: Spacebar

- **Global Management**
  - `keys`: Set containing all registered keys
  - Event listeners for `keydown` and `keyup`

## Scripts

- `npm start` - Start development server with hot reloading
- `npm run build` - Build for production
- `npm run format` - Format code with Prettier

## Support

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/ghom)