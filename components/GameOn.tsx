import { SyntheticEvent } from "react";

interface GameOnProps {
  infoHandler: (event: SyntheticEvent) => void;
  submitMoveHandler: () => void;
  buyPowerHandler: (event: SyntheticEvent) => void;
}

function GameOn({
  infoHandler,
  submitMoveHandler,
  buyPowerHandler,
}: GameOnProps) {
  return (
    <>
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 1024 1024"
        className="w-full h-full object-contain"
      >
        <image width="1024" height="1024" opacity="100" href="/game_on.png" />
        <a href="https://discord.com">
          <rect
            x="762"
            y="204"
            fill="#fff"
            opacity="0"
            width="136"
            height="54"
          />
        </a>
        <a onClick={infoHandler}>
          <rect
            x="126"
            y="204"
            fill="#fff"
            opacity="0"
            width="136"
            height="54"
            className="cursor-pointer"
          />
        </a>

        <a onClick={submitMoveHandler}>
          <rect
            x="528"
            y="610"
            fill="#fff"
            opacity="0"
            width="298"
            height="24"
            className="cursor-pointer"
          />
        </a>
        <a onClick={buyPowerHandler}>
          <rect
            x="528"
            y="640"
            fill="#fff"
            opacity="0"
            width="298"
            height="24"
            className="cursor-pointer"
          />
        </a>
      </svg>
    </>
  );
}

export default GameOn;
