import { useSelector } from "react-redux";
import { selectValidMoves } from "../../store/boardSlice";
import { OverlayProps } from "./overlay";

export function BoardValidMoveOverlay({ x, y, square }: OverlayProps) {
  const validMoves = useSelector(selectValidMoves);

  return (
    <>
      {validMoves !== null && validMoves.some((move) => move == square) ? (
        <rect
          x={32 + x * 64 + 32 - 6}
          y={y * 64 + 32 - 6}
          width="12"
          height="12"
          className="fill-[#FF0000] opacity-100 cursor-pointer"
        />
      ) : null}
    </>
  );
}
