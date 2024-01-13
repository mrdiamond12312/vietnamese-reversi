import { BOARD_SIZE } from "@/constants/board";
import { TPositionParam } from "@/pages/PlayChess/hooks/useChessBoard";

export type TSymmetricOffsets = {
  first: TPositionParam;
  second: TPositionParam;
};

export const symmetricHelper: TSymmetricOffsets[] = [
  { first: { row: -1, col: -1 }, second: { row: 1, col: 1 } },
  { first: { row: -1, col: 0 }, second: { row: 1, col: 0 } },
  { first: { row: -1, col: 1 }, second: { row: 1, col: -1 } },
  { first: { row: 0, col: 1 }, second: { row: 0, col: -1 } },
];

export const initialBoard = [
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
];

export const symmetricAttackHelper = initialBoard.map((chessRow, row) =>
  chessRow.map((_, col) =>
    symmetricHelper
      .map((direction): TSymmetricOffsets | null => {
        const firstChessRow = row + direction.first.row;
        const firstChessCol = col + direction.first.col;

        const secondChessRow = row + direction.second.row;
        const secondChessCol = col + direction.second.col;
        if (
          firstChessRow >= 0 &&
          firstChessRow < BOARD_SIZE &&
          firstChessCol >= 0 &&
          firstChessCol < BOARD_SIZE &&
          secondChessRow >= 0 &&
          secondChessRow < BOARD_SIZE &&
          secondChessCol >= 0 &&
          secondChessCol < BOARD_SIZE
        ) {
          return {
            first: { row: firstChessRow, col: firstChessCol },
            second: { row: secondChessRow, col: secondChessCol },
          };
        } else return null;
      })
      .filter((data) => data !== null)
  )
);

export const chessMoveHelper = [
  // Diagonal Moves
  [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ],
  // Normal Moves
  [
    [-1, 0],
    [0, -1],
    [0, 1],
    [1, 0],
  ],
];

export const neighborHelper = initialBoard.map((chessRow, row) =>
  chessRow.map((_, col) =>
    chessMoveHelper[(row * BOARD_SIZE + col) % 2]
      .map((dir): TPositionParam | null => {
        const neighborRow = row + dir[0];
        const neighborCol = col + dir[1];

        if (
          neighborRow >= 0 &&
          neighborRow < BOARD_SIZE &&
          neighborCol >= 0 &&
          neighborCol < BOARD_SIZE
        ) {
          return { row: neighborRow, col: neighborCol };
        } else return null;
      })
      .filter((value) => value !== null)
  )
);

console.log(neighborHelper);
