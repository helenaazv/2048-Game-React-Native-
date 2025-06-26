# 2048 Game - React Native
This project is a mobile adaptation of the classic 2048 puzzle game, which I originally implemented as a Python terminal application and have now brought to life with a colorful React Native UI and intuitive swipe gestures.

## Features
- Classic 4×4 2048 gameplay
- Smooth swipe controls using react-native-gesture-handler
- Pastel colored and responsive tile animations with expo-linear-gradient
- Keeps track of the score
- Game win/loss detection
- Restart button when the game ends

## Getting Started

### Prerequisites
To run this project, you’ll need:

- Node.js
- Expo CLI
- A mobile device with Expo Go installed or an emulator/simulator

### Installation

- git clone [https://github.com/helenaazv/2048-Game-React-Native.git](https://github.com/helenaazv/2048-Game-React-Native-.git)
- cd 2048-react-native
- npm install
- expo start

Then, scan the QR code with the Expo Go app or run it on your simulator.

## How to Play
- Swipe in any direction (up, down, left, right) to move the tiles:
- Tiles with the same number merge into one when they touch
- After each move, a new tile (2 or 4) appears
- Reach the 2048 tile to win!
- No more possible moves? Game over.

## File Structure

- App.js – Main game logic and UI
- styles.js – External stylesheet for clean separation of UI design

## Dependencies
- react-native-gesture-handler
- expo-linear-gradient
- react, react-native, and expo

Install them using:

npm install react-native-gesture-handler expo-linear-gradient

## Built With
- React Native – For building the mobile interface
- Expo – For streamlined mobile development
- Functional JavaScript – Logic for game movement and merging

## Future Improvements
- Add sound effects
- Dark mode


