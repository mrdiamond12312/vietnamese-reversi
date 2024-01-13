import { PLAYER_1, PLAYER_2 } from "@/constants/board";

export const twoDimensionArraySum = (array: number[][]) =>
  array.reduce((accRow, row) => {
    const rowSum = row.reduce(
      (accCol, col) =>
        accCol + (col === PLAYER_1 || col === PLAYER_2 ? col : 0),
      0
    );
    return accRow + rowSum;
  }, 0);
