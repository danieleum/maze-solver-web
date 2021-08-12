import React, {Component} from 'react';

import Square from '../components/Square';
import * as leeAlgo from '../algorithm/LeeAlgo';

import './MazeSolver.css';

const start = 0;
const end = 19;
/*
const rows = 20;
const cols = 20;
*/

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
          distance: 0,
          wall: false,
          previous: null,
          start: row === start && col === start,
          end: row === end && col === end
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

  doLeeAlgo() {
    let grid = this.state.squares;
    let visited  = leeAlgo.leeAlgo(grid, start, start, end, end);
    draw(visited, grid);
  }

  render() {
    const {squares} = this.state;
    console.log(squares)
    console.log(squares.length)
    /*
    const check = Array(squares.length).fill(0).map(row => new Array(squares[0].length).fill(0));
    console.log(check);
    */

    return (
      <div className="board">
        
        <div>
          <button onClick={() => this.doLeeAlgo()}>
            Check the maze
          </button>
        </div>
        {squares.map((row, rowIndex) => {
          return (
            <div key={rowIndex}>
              {row.map((square, squareIndex) => {
                const {start, end, wall} = square;
                return (
                  <Square
                    col={squareIndex}
                    row={rowIndex}
                    key={squareIndex}
                    start={start}
                    end={end}
                    wall={wall}
                    onClick={(row, col) => this.handleClick(row, col)}>
                  </Square>
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

async function visualizePath(visited) {
  let promise;
  for (let i = 0; i < visited.length; i++) {
    promise = new Promise(resolve => setTimeout(() => {
        const node = visited[i];
        const curr = document.getElementById(`square-${node.row}-${node.col}`).style;
        curr.backgroundColor = "brown";
        resolve();
      }, 10 * i));
  }
  return promise;
}

function visualizeShortestPath(grid) {
  let path = [];
  let node = grid[end][end];
  path.push(node);
  while (node.previous !== null) {
    path.push(node.previous);
    node = node.previous;
  }
  for (let i = 0; i < path.length; i++) {
    setTimeout(() => {
      let curr = path[i];
      let style = document.getElementById(`square-${curr.row}-${curr.col}`).style;
      style.backgroundColor = "yellow";
    }, 10 * i);
  }
}

async function draw(visited, grid) {
  if (visited.length !== 0) {
    await visualizePath(visited);
    visualizeShortestPath(grid);
  } else {
    window.alert("Maze cannot be solved. Please create a valid maze.");
  }
}