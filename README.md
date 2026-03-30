
# Dee Jungle Assignment

This is a React Native app built with Expo. It demonstrates how to get data from the internet, save it, and add visual animations.

## What it does

* **Fetches Data:** The app has a single screen with a "Fetch Data" button. When it is pressed, app downloads a list of items from a JSONPlaceholder.
* **Counts Clicks:** It keeps track of how many times the button is pressed using a counter.
* **Shows a List:** The downloaded items are displayed in a smooth, scrollable list.
* **Saves Progress:** The app remembers the counter number and downloaded items, even if it is completely closed and restarted.
* **Animated Counter:** The counter is big and easy to see. Every time the number goes up, it smoothly changes its color, shape, and size.

## Architecture Choices

* **Core Setup:** Built with React Native, TypeScript, and Expo to ensure a fast, reliable, and type-safe development environment.
* **State Management:** Zustand is used state management. It is lightweight, requires very little boilerplate, and pairs easily with local storage to persist the counter and list data across app restarts.
* **Smooth Animations:** React Native Reanimated is used for the counter animations. It runs directly on the UI thread, ensuring the color, shape, and size transitions are perfectly smooth and do not slow down the rest of the app.

---

## How to run the app

### 1. Install the necessary files

```bash
npm install
```

### 2. Start the app

```bash
npx expo start
```

### 3. Open the app:
Once the server starts, the terminal will provide options to view the app on:
* An Android emulator
* An iOS simulator
* Physical phone using the Expo Go app
