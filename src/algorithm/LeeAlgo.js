
// grid => initial grid... tells us where the walls are
// startX & startY => starting node index
// endX & endY => ending node index
export function leeAlgo (grid, startX, startY, endX, endY) {
  let visited = bfs(grid, startX, startY, endX, endY);
  return visited;
}

// grid => initial grid... tells us where the walls are
// startX & startY => starting node index
// endX & endY => ending node index


function bfs (grid, startX, startY, endX, endY) {
  // matrix to track visited (maybe not needed?)
  // 0 -> unvisited
  // 1 -> visited
  const visited = Array(grid.length).fill(0).map(row => new Array(grid[0].length).fill(0));
  
  // empty queue
  let queue = [];
  
  // maybe have a list that keeps track of the visited nodes... append the current node that we are examining
  let visitedList = [];
  
  // mark source square as visited in matrix and list
  visited[startX][startY] = 1;
  visitedList.push(grid[startX][startY]);
  
  // enqueue source square
  queue.push(grid[startX][startY]);

  // variable to store length of longest?? path from source to destination
  let min = Number.MAX_SAFE_INTEGER;

  // while queue is not empty
  while (queue.length !== 0) {
    //    dequeue front node 
    let current = queue.shift();

    /*
    <Square 
      col={squareIndex} 
      row={rowIndex} 
      key={squareIndex} 
      start={start} 
      end={end} 
      wall={wall} 
      distance=0
      onClick={(row, col) => this.handleClick(row, col)}>
    </Square>
    */
    
    //    get node coordinates and distance (do we need distance?) 
    let x = current.row;
    let y = current.col;
    let dist = current.distance;
    
    //    if node is destination, update the distance tracking variable and return ??
    if (x === endX && y === endY) {
      min = dist;
      return visitedList;
    }

    // x and y possible movements
    const xMove = [-1, 0, 0, 1];
    const yMove = [0, -1, 1, 0];
    
    //    check for the 4 possible movements from current cell
    for (let i = 0; i < 4; i++) {
      // check if movement is valid 
      if (isValid(grid, visited, x + xMove[i], y + yMove[i])) {
        // mark the nodes as visited
        visited[x + xMove[i]][y + yMove[i]] = 1;

        let next = grid[x + xMove[i]][y + yMove[i]];
        
       
        // update distance 
        next.distance++;
        // enqueue the node representing valid movement 
        queue.push(next);

        visitedList.push(next);
        // updating the previous node
        next.previous = current;
      }
    }
  }
  // if path not found returns empty list
  return [];
}

// checks that square coordinates are in matrix bounds and non-negative
function isValid(grid, visited, row, col) {
  if (row < 0 || row >= grid.length || col < 0 || col >= grid[0].length || grid[row][col].wall || visited[row][col]) {
    return false;
  }

  return true;
}






