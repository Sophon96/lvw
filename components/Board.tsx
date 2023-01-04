import { Chess, Square } from "chess.js";
import clsx from "clsx";
import Image from "next/image";
import { SyntheticEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectMoveState,
  selectMoveFrom,
  selectMoveTo,
  selectFEN,
  selectValidMoves,
  startMove,
  endMove,
  resetMove,
} from "../store/boardSlice";
import {BoardChessPieceOverlay} from "./Board/ChessPieceOverlay";
import { BoardSquaresOverlay } from "./Board/SquaresOverlay";

import {BoardValidMoveOverlay} from "./Board/ValidMoveOverlay";

export default function Board() {
  return (
    <svg
      className="m-auto h-full w-full object-contain"
      viewBox="0 0 544 544"
    >
      <foreignObject height="544" width="544">
        <Image
          quality="100"
          src="/board.png"
          alt=""
          style={{
            imageRendering: "pixelated",
            objectFit: "contain",
            objectPosition: "center",
          }}
          fill
          priority
        />
      </foreignObject>
      <BoardSquaresOverlay />
    </svg>
  );
}
