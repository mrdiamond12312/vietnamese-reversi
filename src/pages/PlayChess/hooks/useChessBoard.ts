import {
  BOARD_SIZE,
  MOVEMENT_GUIDE_FLAG,
  PLAYER_1,
  PLAYER_2,
  TRAPPING_FLAG,
} from "@/constants/board";
import {
  chessMoveHelper,
  neighborHelper,
  symmetricAttackHelper,
} from "@/constants/helpers";
import { twoDimensionArraySum } from "@/utils/arrayCalc";
import { useCallback, useEffect, useMemo, useState } from "react";
import { notification } from "antd";

export type TPosition = {
  row: number | null;
  col: number | null;
};

export type TPositionParam = {
  row: number;
  col: number;
};

export const useChessBoard = () => {
  const [prevBoard, setPrevBoard] = useState<number[][][]>([]);
  const [chessBoard, setChessBoard] = useState<number[][]>([
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, -1],
    [-1, 0, 0, 0, -1],
    [-1, -1, -1, -1, -1],
  ]);

  const [trap, setTrap] = useState<TPosition>({
    row: null,
    col: null,
  });

  const [currentPlayer, setCurrentPlayer] = useState<number>(1);

  const [currentChess, setCurrentChess] = useState<TPosition>({
    row: null,
    col: null,
  });

  const noChessChosen = useMemo(
    () => currentChess.col === null && currentChess.row === null,
    [currentChess]
  );
  const isDiagonalMoveAvailable = (position: TPosition) =>
    position.row !== null && position.col !== null
      ? (position.col + position.row * 5) % 2
      : 0;

  const clearMoveGuides = () => {
    setChessBoard((previous) =>
      previous.map((row) =>
        row.map((col) =>
          col === PLAYER_1 * MOVEMENT_GUIDE_FLAG ||
          col === PLAYER_2 * MOVEMENT_GUIDE_FLAG
            ? 0
            : col
        )
      )
    );
  };

  const pickUpChess = useCallback(
    (position: TPosition) => {
      if (
        position.col !== null &&
        position.row !== null &&
        chessBoard[position.row][position.col] === currentPlayer
      ) {
        setCurrentChess(position);
      }
    },
    [chessBoard]
  );

  const getMovable = (position: TPosition) => {
    return chessMoveHelper[isDiagonalMoveAvailable(position)]
      .map((direction) => ({
        row: (position.row ?? -100) + direction[0],
        col: (position.col ?? -100) + direction[1],
      }))
      .filter(
        (position) =>
          position.row >= 0 &&
          position.row < BOARD_SIZE &&
          position.col >= 0 &&
          position.col < BOARD_SIZE &&
          chessBoard[position.row][position.col] !== PLAYER_1 &&
          chessBoard[position.row][position.col] !== PLAYER_2
      );
  };

  const addMoveGuides = useCallback(() => {
    if (!noChessChosen) {
      setChessBoard((previous) => {
        const tempBoard = previous;

        const placeToHighlight = getMovable(currentChess);
        placeToHighlight.map((place) => {
          if (
            tempBoard[place.row][place.col] !== PLAYER_1 * TRAPPING_FLAG &&
            tempBoard[place.row][place.col] !== PLAYER_2 * TRAPPING_FLAG
          ) {
            tempBoard[place.row][place.col] =
              currentPlayer * MOVEMENT_GUIDE_FLAG;
          }
        });

        return tempBoard;
      });
    }
  }, [currentChess]);

  const symmetricAttack = useCallback(
    (board: number[][], position: TPositionParam) => {
      symmetricAttackHelper[position.row][position.col].map((symmetricPair) => {
        if (
          symmetricPair !== null &&
          board[symmetricPair.first.row][symmetricPair.first.col] ===
            board[symmetricPair.second.row][symmetricPair.second.col] &&
          board[symmetricPair.second.row][symmetricPair.second.col] ===
            -currentPlayer
        ) {
          board[symmetricPair.first.row][symmetricPair.first.col] =
            currentPlayer;
          board[symmetricPair.second.row][symmetricPair.second.col] =
            currentPlayer;
        }
      });

      return board;
    },
    [currentPlayer]
  );

  const libertyAttack = useCallback(
    (board: number[][]) => {
      const libertyMap: boolean[][] = Array.from({ length: BOARD_SIZE }, () =>
        Array.from({ length: BOARD_SIZE }, () => false)
      );
      // Check for piece of chess with liberty (air) # Dont care if it is enemies or not
      libertyMap.map((rowData, row) =>
        rowData.map((_, col) => {
          if (
            (board[row][col] === PLAYER_1 || board[row][col] === PLAYER_2) &&
            neighborHelper[row][col].some((neighbor) => {
              if (neighbor && board[neighbor.row][neighbor.col] === 0) {
                return true;
              } else return false;
            })
          ) {
            libertyMap[row][col] = true;
          }
        })
      );

      // Tracing for change in liberty map after each check for group liberty
      let isLibertyModified = true;
      while (isLibertyModified) {
        isLibertyModified = false;
        libertyMap.map((rowData, row) =>
          rowData.map((data, col) => {
            if (
              (board[row][col] === PLAYER_1 || board[row][col] === PLAYER_2) &&
              !libertyMap[row][col] &&
              neighborHelper[row][col].some((neighbor) => {
                if (
                  neighbor &&
                  libertyMap[neighbor.row][neighbor.col] &&
                  board[neighbor.row][neighbor.col] === board[row][col]
                ) {
                  return true;
                } else return false;
              })
            ) {
              isLibertyModified = true;
              libertyMap[row][col] = true;
            }
          })
        );

        if (!isLibertyModified) break;
      }

      libertyMap.map((rowData, row) =>
        rowData.map((liberty, col) => {
          if (
            (board[row][col] === PLAYER_1 || board[row][col] === PLAYER_2) &&
            !liberty
          ) {
            board[row][col] = currentPlayer;
          }
        })
      );
    },
    [currentPlayer]
  );

  const detectTrap = useCallback(
    (board: number[][]) => {
      if (
        currentChess.row !== null &&
        currentChess.col !== null &&
        symmetricAttackHelper[currentChess.row][currentChess.col].some(
          (symmetricPair) =>
            symmetricPair !== null &&
            board[symmetricPair.first.row][symmetricPair.first.col] ===
              board[symmetricPair.second.row][symmetricPair.second.col] &&
            board[symmetricPair.second.row][symmetricPair.second.col] ===
              currentPlayer
        ) &&
        neighborHelper[currentChess.row][currentChess.col].some(
          (neighbor) =>
            neighbor && board[neighbor.row][neighbor.col] === -currentPlayer
        )
      ) {
        setTrap(currentChess);
        board[currentChess.row][currentChess.col] =
          TRAPPING_FLAG * -currentPlayer;
        console.log(board);
      } else {
        setTrap({
          row: null,
          col: null,
        });
      }
    },
    [currentChess, currentPlayer]
  );

  const moveChessPiece = useCallback(
    (position: TPositionParam) => {
      if (
        trap.row !== null &&
        trap.col !== null &&
        (position.row !== trap.row || position.col !== trap.col)
      ) {
        notification.error({
          message: "Nước đi không hợp lệ!",
          description:
            "Đối thủ đã đi nước cờ mở, bạn phải di chuyển quân ở xung quanh vị trí đánh dấu vào bẫy!",
        });
        return;
      }
      setChessBoard((previous) => {
        const temp = previous;
        if (currentChess.row !== null && currentChess.col !== null) {
          temp[currentChess.row][currentChess.col] = 0;
          temp[position.row][position.col] = currentPlayer;
          symmetricAttack(temp, position);
          libertyAttack(temp);

          // Trapping occurs only when no chess piece has been flipped
          if (twoDimensionArraySum(chessBoard) === twoDimensionArraySum(temp)) {
            detectTrap(temp);
          } else {
            setTrap({
              row: null,
              col: null,
            });
          }

          setPrevBoard((prev) => [...prev, previous]);
          return temp;
        } else return previous;
      });
      setCurrentChess({
        row: null,
        col: null,
      });
      setCurrentPlayer((prev) => -prev);
    },
    [currentChess]
  );

  useEffect(() => {
    clearMoveGuides();
    addMoveGuides();
  }, [currentChess]);

  return {
    chessBoard,
    setChessBoard,
    currentChess,
    setCurrentChess,
    currentPlayer,
    setCurrentPlayer,
    moveChessPiece,
    pickUpChess,
  } as const;
};
