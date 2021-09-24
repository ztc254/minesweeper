const calcMines = (width = 9, height = 9, mineCount = 10) => {
  // Mine: -1. Possible outcome: -1 ~ 8
  // If mineCount overflow, return all mines
  if (mineCount >= width * height) {
    return Array(height)
      .fill(0)
      .map((x) => Array(width).fill(-1));
  }

  const mineMap = Array(height)
    .fill(0)
    .map((x) => Array(width).fill(0));

  // Generate Mines
  const mines = [];
  for (let i = 0; i < mineCount; ++i) {
    let current = Math.floor(Math.random() * width * height);
    if (!mines.includes(current)) {
      mines.push(current);
      mineMap[Math.floor(current / width)][current % width] = -1;
    } else {
      i--;
    }
  }

  // Calculate Mine map
  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];
  for (let i = 0; i < height; ++i) {
    for (let j = 0; j < width; ++j) {
      if (mineMap[i][j] !== -1) {
        let countMines = 0;
        for (let d of directions) {
          countMines += Number(
            i + d[0] >= 0 &&
              i + d[0] < height &&
              j + d[1] >= 0 &&
              j + d[1] < width &&
              mineMap[i + d[0]][j + d[1]] === -1
          );
        }
        mineMap[i][j] = countMines;
      }
    }
  }

  return mineMap;
};

export {calcMines as mineMap};
