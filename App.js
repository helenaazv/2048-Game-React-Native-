import React, { useState } from 'react';
import { StyleSheet, View, Text, Alert, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './styles';


const BOARD_SIZE = 4;

const getEmptyBoard = () => { /*Returns a 4×4 board filled with zeros*/
  return Array(BOARD_SIZE)
    .fill()
    .map(() => Array(BOARD_SIZE).fill(0));
};

const getRandomTileValue = () => (Math.random() < 0.9 ? 2 : 4); /*Returns random tile value (2 or 4)*/

const addNewTile = (board) => {  /*2D board as input*/
  const emptyCells = [];
  board.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (cell === 0) emptyCells.push([i, j]); /*stores array of all empty cells*/
    });
  });

  if (emptyCells.length > 0) {
    const [i, j] = emptyCells[Math.floor(Math.random() * emptyCells.length)]; /*picks random index from list*/
    board[i][j] = getRandomTileValue();
  }

  return board;
};

const compress = (row) => {
  const newRow = row.filter((num) => num !== 0); /*keeps only the non-zero values*/
  while (newRow.length < BOARD_SIZE) newRow.push(0); /*adds zeros until the row is back to size 4*/
  return newRow;
};

const merge = (row) => {
  for (let i = 0; i < BOARD_SIZE - 1; i++) {
    if (row[i] !== 0 && row[i] === row[i + 1]) {
      row[i] *= 2;  /*duplicate*/
      row[i + 1] = 0;  /*set to zero*/
    }
  }
  return row;
};

const moveLeft = (board) => {   /* [2, 0, 2, 2] --> compress [2, 2, 2, 0] --> merge [4, 0, 2, 0] --> compress [4, 2, 0, 0]*/
  return board.map((row) => compress(merge(compress(row))));
};

const moveRight = (board) => { /*reverse --> do left logic --> reverse back*/
  return board.map((row) => compress(merge(compress(row.reverse()))).reverse());
};

const rotateClockwise = (board) => {
  const size = board.length;
  const newBoard = [];

  for (let col = 0; col < size; col++) { /*column*/
    const newRow = [];

    for (let row = size - 1; row >= 0; row--) {
      newRow.push(board[row][col]); /*Goes through first column and take it from last to top row... */
    }

    newBoard.push(newRow);
  }

  return newBoard;
};

const rotateCounterClockwise = (board) => {
  const size = board.length;
  const newBoard = [];

  for (let col = size - 1; col >= 0; col--) {
    const newRow = [];

    for (let row = 0; row < size; row++) {
      newRow.push(board[row][col]); /*Goes through last column and take it from top to botton row... */
    }

    newBoard.push(newRow);
  }

  return newBoard;
};


const moveUp = (board) => {
  let rotated = rotateCounterClockwise(board);
  rotated = moveLeft(rotated);
  return rotateClockwise(rotated);
};

const moveDown = (board) => {
  let rotated = rotateCounterClockwise(board);
  rotated = moveRight(rotated);
  return rotateClockwise(rotated);
};

const isGameOver = (board) => {
  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      if (board[i][j] === 0) return false; /*not full*/
      if (j < BOARD_SIZE - 1 && board[i][j] === board[i][j + 1]) return false; /*adjacent tiles*/
      if (i < BOARD_SIZE - 1 && board[i][j] === board[i + 1][j]) return false; /*adjacent tiles*/
    }
  }
  return true;
};

const tileColors = {
  0: '#f9f6f2',
  2: '#ffd1dc',
  4: '#fbcdfd',
  8: '#ffe4e1',
  16: '#ffe8b3',
  32: '#c5f5dc',
  64: '#cce7ff',
  128: '#fce7f3',
  256: '#e9d8fd',
  512: '#fffacc',
  1024: '#ffdef0',
  2048: '#ffe3f3',
};

export default function App() {
  const [board, setBoard] = useState(addNewTile(addNewTile(getEmptyBoard()))); //two new tiles to start game
  const [score, setScore] = useState(0); //score is set to 0
  const [canSwipe, setCanSwipe] = useState(true); //can the user swipe?
  const [gameOver, setGameOver] = useState(false); //boolean for losing
  const [gameWon, setGameWon] = useState(false); //boolean for winning

  const handleSwipe = (direction) => {
    if (!canSwipe || gameOver || gameWon) return;

    setCanSwipe(false);
    setTimeout(() => setCanSwipe(true), 500); //disables swiping for 500ms

    let newBoard; //holds result after every move
    switch (direction) {
      //.map() produces a new array of rows, where each row is a copied array. 
      //[...row] creates a new array that is a copy of the original

      case 'left':
        newBoard = moveLeft(board.map(row => [...row]));
        break;
      case 'right':
        newBoard = moveRight(board.map(row => [...row]));
        break;
      case 'up':
        newBoard = moveUp(board.map(row => [...row]));
        break;
      case 'down':
        newBoard = moveDown(board.map(row => [...row]));
        break;
      default:
        return;
    }

    if (JSON.stringify(newBoard) !== JSON.stringify(board)) { //did board change?
      const updatedBoard = addNewTile(newBoard.map(row => [...row])); //copy and add new tile
      setBoard(updatedBoard); //board data changed and needs to re-render the UI 

      const newScore = updatedBoard.flat().reduce((a, b) => a + b, 0); //sum all values and calculate score
      setScore(newScore);

      if (updatedBoard.flat().includes(2048)) {
        setGameWon(true);
        Alert.alert("You Win!", "Congratulations! You reached 2048!");
      } else if (isGameOver(updatedBoard)) {
        setGameOver(true);
        Alert.alert("Game Over", "No more moves left!");
      }
    }
  };

  const onGestureEvent = (event) => {
    const { translationX, translationY } = event.nativeEvent; //how much the finger moved X and Y
    const threshold = 20; //Min move needed

    if (Math.abs(translationX) > Math.abs(translationY)) {
      if (translationX > threshold) handleSwipe('right');
      else if (translationX < -threshold) handleSwipe('left');
    } else {
      if (translationY > threshold) handleSwipe('down');
      else if (translationY < -threshold) handleSwipe('up');
    }
  };

  const restartGame = () => {
    const newBoard = addNewTile(addNewTile(getEmptyBoard()));
    setBoard(newBoard);
    setScore(0);
    setGameOver(false);
    setGameWon(false);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <View style={{ flex: 1 }}>
          <LinearGradient
            colors={['#ffd1dc', '#fbcdfd', '#cce7ff', '#c5f5dc', '#fffacc', '#ffe8b3']}
            style={styles.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.container}>
              <Text style={styles.title}>2048 Game</Text>
              <Text style={styles.score}>Score: {score}</Text>
              <View style={styles.board}>
                {board.map((row, rowIndex) => (
                  <View key={rowIndex} style={styles.row}>
                    {row.map((cell, colIndex) => (
                      <View
                        key={colIndex}
                        style={[styles.cell, { backgroundColor: tileColors[cell] || '#3c3a32' }]}
                      >
                        <Text style={styles.cellText}>{cell !== 0 ? cell : ''}</Text>
                      </View>
                    ))}
                  </View>
                ))}
              </View>
              <Text style={styles.instructions}>Reach 2048!</Text>

              {(gameOver || gameWon) && (
                <TouchableOpacity style={styles.restartButton} onPress={restartGame}>
                  <Text style={styles.restartButtonText}>Restart Game</Text>
                </TouchableOpacity>
              )}
            </View>
          </LinearGradient>
        </View>
      </PanGestureHandler>
    </GestureHandlerRootView>);
}

