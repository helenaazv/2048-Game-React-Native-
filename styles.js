import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#776e65',
  },
  score: {
    fontSize: 18,
    marginBottom: 20,
    color: '#776e65',
  },
  board: {
    backgroundColor: '#bbada0',
    padding: 5,
    borderRadius: 10,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 70,
    height: 70,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  cellText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#776e65',
  },
  instructions: {
    marginTop: 20,
    fontSize: 16,
    color: '#776e65',
  },
  restartButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#fbcdfd',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  restartButtonText: {
    color: '#776e65',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  gradient: {
    flex: 1,
  },
});
