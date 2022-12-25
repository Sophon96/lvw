import Image from "next/image";
import { SyntheticEvent, useState } from "react";

interface BuyPowerProps {
  closeHandler: (event: SyntheticEvent) => void;
  infoHandler: (event: SyntheticEvent) => void;
}

export default function BuyPower({ closeHandler, infoHandler }: BuyPowerProps) {
  const [leelaHightlighted, setLeelaHighlighted] = useState(false);
  return (
    <>
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 1024 1024"
        className="w-full h-full object-contain"
      >
        <g renderingIntent={1000}>
          <image width="1024" height="1024" href="/buy_power_popup.png"></image>
        </g>
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
        <foreignObject x="461" y="528" width="86" height="19">
          <input type="text" className="bg-[#041349] text-white"></input>
        </foreignObject>

        <foreignObject x="452" y="556" width="92" height="24">
          <label>
            <input
              type="radio"
              name="bet-choice"
              value="leela"
              className="absolute w-0 h-0 opacity-0"
              onChange={() => {
                setLeelaHighlighted(true);
              }}
            />
            {leelaHightlighted ? (
              <Image
                src="/buy_power/leela_button.png"
                alt="EEEEEEEEEEEEEEEEeeeeeee"
                width="92"
                height="24"
                priority={true}
                className="cursor-pointer"
              />
            ) : (
              <Image
                src="/buy_power/gray_leela_button.png"
                alt="EEEEEEEEEEEEEE"
                width="92"
                height="24"
                priority={true}
                className="cursor-pointer"
              />
            )}
          </label>
        </foreignObject>
        <foreignObject x="576" y="556" width="92" height="24">
          <label>
            <input
              type="radio"
              name="bet-choice"
              value="za warudo"
              className="absolute w-0 h-0 opacity-0"
              onChange={() => {
                setLeelaHighlighted(false);
              }}
              defaultChecked
            />
            {!leelaHightlighted ? (
              <Image
                src="/buy_power/world_button.png"
                alt="Za Warudo"
                width="92"
                height="24"
                priority={true}
                className="cursor-pointer"
              />
            ) : (
              <Image
                src="/buy_power/gray_world_button.png"
                alt="No Za Warudo"
                width="92"
                height="24"
                priority={true}
                className="cursor-pointer"
              />
            )}
          </label>
        </foreignObject>
      </svg>
    </>
  );
}
