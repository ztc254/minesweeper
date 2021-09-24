import React from "react";
import { mineMap } from "./mineMap";

function SingleMine(props) {
  // Todo: learn to insert a pic
  return (
    <button className="square" onClick={props.onClick}>
      {props.state ? props.value ? props.value : '' : "X"}
    </button>
  );
}

class Mines extends React.Component {
  constructor(props) {
    super(props);
    this.width = props?.width || 9;
    this.height = props?.height || 9;
    this.mineCount = props?.mineCount || 10;
    this.mineMap = mineMap(this.width, this.height, this.mineCount);
    this.state = {
      reveal: Array(this.height)
        .fill(0)
        .map(() => Array(this.width).fill(0)),
      // States: 0: covered; 1: revealed; 2: flagged
      ended: 0,
    };
  }

  getNearbySquares(row, col) {
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

    const result = [];
    for (let d of directions) {
      if (
        0 <= row + d[0] &&
        row + d[0] < this.height &&
        0 <= col + d[1] &&
        col + d[1] < this.width
      ) {
        result.push([row + d[0], col + d[1]]);
      }
    }
    return result;
  }

  recursiveReveal(row, col) {
    this.tempState[row][col] = 1;
    if (this.mineMap[row][col] !== 0) {
      return this.mineMap[row][col] === -1 ? 0 : 1;
    }

    const availableSquares = this.getNearbySquares(row, col).filter(
      (axis) => this.tempState[axis[0]][axis[1]] === 0
    );
    for (let s of availableSquares) {
      if (
        this.mineMap[s[0]][s[1]] === -1 ||
        this.recursiveReveal(s[0], s[1], this.tempState) === 0
      ) {
        return 0;
      }
    }
    return 1;
  }

  revealAllNearbySquares(row, col) {
    this.tempState = [...this.state.reveal];
    if (!this.recursiveReveal(row, col)) {
      this.setState({ ended: 1 });
    }
    this.setState({ reveal: this.tempState });
  }

  handleOnClick(row, col) {
    if (this.state.ended) {
      return;
    }
    this.revealAllNearbySquares(row, col);
  }

  render() {
    return this.mineMap.map((mMapRows, i) => {
      return (
        <div className="mine-rows" key={"row-" + i}>
          {(() => {
            return mMapRows.map((value, j) => (
              <SingleMine
                state={this.state.reveal[i][j]}
                value={value}
                onClick={() => this.handleOnClick(i, j)}
                key={i + "-" + j}
              />
            ));
          })()}
        </div>
      );
    });
  }
}

export default Mines;
