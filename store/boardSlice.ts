import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { Chess, Move, Square } from "chess.js";
import { AppState } from "./store";

// Types for our state
interface IdleBoardState {
  fen: string;
  moveState: "idle";
  moveFrom: null;
  moveTo: null;
  validMoves: null;
}

interface MovingBoardState {
  fen: string;
  moveState: "moving";
  moveFrom: Square;
  moveTo: null;
  validMoves: Square[];
}

interface MovedBoardState {
  fen: string;
  moveState: "moved";
  moveFrom: Square;
  moveTo: Square;
  validMoves: null;
}

export type BoardState = IdleBoardState | MovingBoardState | MovedBoardState;

// Initial state
const initialState: BoardState = {
  // TODO: set state from smart contract
  fen: "rnbq1bnr/ppppkppp/4p3/8/8/4P3/PPPPKPPP/RNBQ1BNR w - - 2 3",
  moveState: "idle",
  moveFrom: null,
  moveTo: null,
  validMoves: null,
};

// Actual Slice
export const boardSlice = createSlice({
  name: "board",
  initialState: initialState as BoardState,
  reducers: {
    // Action to start a move
    startMove(state, action) {
      state.moveState = "moving";

      // Get valid moves
      // FIXME: stop initializing so many Chess
      let chess = new Chess(state.fen);
      // XXX: DEBUG
      //console.log(chess);
      let validMoves: Move[] = chess.moves({
        square: action.payload,
        verbose: true,
      });
      // XXX: DEBUG
      // console.log(validMoves);
      state.validMoves = validMoves.map((move) => move.to as Square);

      state.moveFrom = action.payload;
    },

    // Action to end a move
    endMove(state, action) {
      state.moveState = "moved";
      state.validMoves = null;
      state.moveTo = action.payload;
    },

    // Action to reset the move
    resetMove(state) {
      state.moveState = "idle";
      state.moveFrom = null;
      state.moveTo = null;
      state.validMoves = null;
    },
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {});
  },
});

export const { startMove, endMove, resetMove } = boardSlice.actions;

export const selectFEN = (state: AppState) => state.board.fen;
export const selectMoveState = (state: AppState) => state.board.moveState;
export const selectMoveFrom = (state: AppState) => state.board.moveFrom;
export const selectMoveTo = (state: AppState) => state.board.moveTo;
export const selectValidMoves = (state: AppState) => state.board.validMoves;
