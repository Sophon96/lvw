import { Chess } from "chess.js";
import { useSelector } from "react-redux";
import { selectFEN } from "../../store/boardSlice";
import { OverlayProps } from "./overlay";

export function BoardChessPieceOverlay({ x, y, square }: OverlayProps) {
  let fen = useSelector(selectFEN);
  // FIXME: stop initializing so many Chess
  let chess = new Chess(fen);
  let piece = chess.get(square);

  return (
    <>
      {piece ? (
        <image
          x={32 + x * 64}
          y={y * 64}
          height="64"
          width="64"
          href={`/chessPieces/${piece.type}${piece.color}.svg`}
          className="cursor-pointer"
        />
      ) : null}
    </>
  );
}
