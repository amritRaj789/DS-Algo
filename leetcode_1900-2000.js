/* 1914. Cyclically Rotating a Grid

You are given an m x n integer matrix grid​​​, where m and n are both even integers, and an integer k.
A cyclic rotation of the matrix is done by cyclically rotating each layer in the matrix. To cyclically rotate a layer once, each element in the layer will take the place of the adjacent element in the counter-clockwise direction. An example rotation is shown below: */

var rotateGrid = function (grid, k) {
  let rows = grid.length;
  let cols = grid[0].length;
  let layers = rows >= cols ? cols / 2 : rows / 2;
  let arr = Array(layers).fill(0);
  let rotated = Array(layers).fill(0);
  for (let i = 0; i < layers; i++) {
    arr[i] = [];
    // traverse the top row
    for (let j = i; j < cols - i; j++) {
      arr[i].push(grid[i][j]);
    }
    // traverse the right side col
    for (let j = i + 1; j < rows - i; j++) {
      arr[i].push(grid[j][cols - 1 - i]);
    }
    // traverse the bottom row
    for (let j = cols - 2 - i; j >= i; j--) {
      arr[i].push(grid[rows - 1 - i][j]);
    }
    // traverse the left side col
    for (let j = rows - 2 - i; j >= i + 1; j--) {
      arr[i].push(grid[j][i]);
    }
  }

  // rotate the array
  for (let i = 0; i < layers; i++) {
    rotated[i] = [];
    let len = arr[i].length;
    for (let j = 0; j < len; j++) {
      rotated[i].push(arr[i][(j + k) % len]);
    }
  }

  // transform the array
  for (let i = 0; i < layers; i++) {
    let z = 0;
    // traverse the top row
    for (let j = i; j < cols - i; j++) {
      grid[i][j] = rotated[i][z++];
    }
    // traverse the right side col
    for (let j = i + 1; j < rows - i; j++) {
      grid[j][cols - 1 - i] = rotated[i][z++];
    }
    // traverse the bottom row
    for (let j = cols - 2 - i; j >= i; j--) {
      grid[rows - 1 - i][j] = rotated[i][z++];
    }
    // traverse the left side col
    for (let j = rows - 2 - i; j >= i + 1; j--) {
      grid[j][i] = rotated[i][z++];
    }
  }

  return grid;
};
