import { PLAYER_1, PLAYER_2 } from "@/constants/board";
import { getMove } from "@/services/chess-bot/api-services";
import { useQuery } from "@tanstack/react-query";

export const useFetchAIMove = (
  prevBoard: number[][],
  board: number[][],
  player: number
) => {
  return useQuery({
    queryKey: [
      prevBoard.map((row) =>
        row.map((value) =>
          [PLAYER_1, 0, PLAYER_2].includes(value) ? value : 0
        )
      ),
      board.map((row) =>
        row.map((value) =>
          [PLAYER_1, 0, PLAYER_2].includes(value) ? value : 0
        )
      ),
    ],
    queryFn: () =>
      getMove(
        prevBoard.map((row) =>
          row.map((value) =>
            [PLAYER_1, 0, PLAYER_2].includes(value) ? value : 0
          )
        ),
        board.map((row) =>
          row.map((value) =>
            [PLAYER_1, 0, PLAYER_2].includes(value) ? value : 0
          )
        ),
        player
      ),
    enabled: player === PLAYER_1,
  });
};
