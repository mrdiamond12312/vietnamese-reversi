import request from "umi-request";

import { CHESS_BOT_URL } from "@/services/chess-bot/api-paths";

export const getMove = async (
  prevBoard: number[][],
  board: number[][],
  player: number
) => {
  return request<API.TAIResult>(CHESS_BOT_URL, {
    method: "POST",
    data: {
      prevBoard,
      board,
      player,
    },
  });
};
