import React, {Component} from 'react';

import Square from '../components/Square';

import './MazeSolver.css';

export default class MazeSolver extends Component {
  constructor(props) {
    super(props);

    this.state = {
      squares: [],
    };
  }

  
  componentDidMount() {
    const squares = [];
    for (let row = 0; row < 20; row++) {
      const current = [];
      for (let col = 0; col < 20; col++) {
        const newSquare = {
          row: row,
          col: col,
          wall: false,
          start: row === 0 && col === 0,
          end: row === 19 && col === 19
        }
        current.push(newSquare);
      }
      squares.push(current);
    }
    this.setState({squares});
  }
  
  handleClick(row, col) {
    let newBoard = createWall(this.state.squares, row, col);
    this.setState({squares: newBoard});
  }


  render() {
    const {squares} = this.state;
    console.log(squares)

    return (
      <div className="board">
        {squares.map((row, rowIndex) => {
          return (
            <div key={rowIndex}>
              {row.map((square, squareIndex) => {
                const {start, end, wall} = square;
                return (
                  <Square col={squareIndex} row={rowIndex} key={squareIndex} start={start} end={end} wall={wall} onClick={(row, col) => this.handleClick(row, col)}></Square>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

function createWall (squares, row, col) {
  let newBoard = squares.slice();
  let current = newBoard[row][col];
  /*
  let wallSquare = {
    ...current,
    wall: !current.wall
  }
  */
  current.wall = !current.wall;
  newBoard[row][col] = current;
  return newBoard;
}

