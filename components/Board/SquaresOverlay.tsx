import { Chess, Square } from "chess.js";
import clsx from "clsx";
import { SyntheticEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  endMove,
  resetMove,
  selectFEN,
  selectMoveFrom,
  selectMoveState,
  selectMoveTo,
  selectValidMoves,
  startMove,
} from "../../store/boardSlice";
import { BoardChessPieceOverlay } from "./ChessPieceOverlay";
import { BoardValidMoveOverlay } from "./ValidMoveOverlay";

export function BoardSquaresOverlay() {
  let fen = useSelector(selectFEN);
  let moveState = useSelector(selectMoveState);
  let moveFrom = useSelector(selectMoveFrom);
  let moveTo = useSelector(selectMoveTo);
  let validMoves = useSelector(selectValidMoves);
  let dispatch = useDispatch();

  let chess = new Chess(fen);

  const handleBoardSquareClick = (event: SyntheticEvent) => {
    const square = event.currentTarget.id as Square;

    if (moveState === "idle") {
      // If the square is occupied by a piece, start a move
      if (chess.get(square)) dispatch(startMove(square));
    } else if (moveState === "moving") {
      // Satisfy typescript
      if (moveFrom === null) {
        console.error("moveFrom is null, but moveState is moving");
        dispatch(resetMove());
        return;
      }
      if (validMoves === null) {
        console.error("validMoves is null, but moveState is moving");
        dispatch(resetMove());
        return;
      }

      // If the user clicked on the same square they started the move from, cancel the move
      if (moveFrom === square) {
        dispatch(resetMove());
        return;
      } else {
        // If the user clicked on a valid square, end the move
        if (validMoves.some((move) => move === square))
          dispatch(endMove(square));
        // If the user clicked on another piece, restart move with that square
        else if (chess.get(square)) {
          dispatch(resetMove());
          dispatch(startMove("square"));
        }
      }
    } else if (moveState === "moved") {
      // Satisfy typescript
      if (moveTo === null) {
        console.error("moveTo is null, but moveState is moved");
        dispatch(resetMove());
        return;
      }

      if (moveTo === square) {
        dispatch(resetMove());
      }
      // If the square is not occupied by a piece, do nothing
      if (chess.get(square)) return;

      // If the square is occupied by a piece, start a move
      dispatch(resetMove());
      dispatch(startMove(square));
    }
  };

  let boardGrid = [];
  for (let i = 0; i < 8; i++) {
    let subElements = [];
    for (let j = 0; j < 8; j++) {
      let square = `${"abcdefgh".charAt(i)}${8 - j}` as Square;
      let chessPiece = <BoardChessPieceOverlay x={i} y={j} square={square} />;
      let validMove = <BoardValidMoveOverlay x={i} y={j} square={square} />;

      if (chessPiece || validMove || moveTo === square) {
        subElements.push(
          <a id={square} onClick={handleBoardSquareClick}>
            <rect
              x={32 + i * 64}
              y={j * 64}
              width="64"
              height="64"
              fill="#fff"
              opacity="0"
              className={clsx(
                moveFrom === square && ["fill-yellow-200", "opacity-50"],
                moveTo === square && [
                  "fill-blue-600",
                  "opacity-50",
                  "cursor-pointer",
                ],
                validMoves !== null &&
                  validMoves.some((move) => move === square) &&
                  "cursor-pointer"
              )}
            />
            {chessPiece}
            {validMove}
          </a>
        );
      }
    }
    boardGrid.push(<g>{subElements}</g>);
  }

  return <>{boardGrid}</>;
}
