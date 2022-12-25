import { SyntheticEvent } from "react";

interface InfoProps {
  closeHandler: (event: SyntheticEvent) => void;
}

export default function Info({ closeHandler }: InfoProps) {
  return (
    <>
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 1024 1024"
        className="w-full h-full object-contain"
      >
        <image width="1024" height="1024" href="/info_popup.png" />
        <a onClick={closeHandler}>
          <rect
            x="748"
            y="364"
            fill="#fff"
            opacity="0"
            width="32"
            height="32"
          />
        </a>
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
        <a onClick={closeHandler}>
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
        <text x="280" y="450" fill="#ffffff">Welcome to Leela vs the World</text>
      </svg>
    </>
  );
}
