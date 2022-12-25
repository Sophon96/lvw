import Image from "next/image";
import { Inter } from "@next/font/google";
import { useState, SyntheticEvent } from "react";
import GameOn from "../components/GameOn";
import BuyPower from "../components/BuyPower";
import Info from "../components/Info";

const inter = Inter({ subsets: ["latin"] });

export function getServerSideProps() {
  // TODO: Actually get data from the database
  return {
    props: {
      board: [
        [6, 5, 4, 3, 0, 4, 5, 6],
        [1, 1, 1, 1, 2, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 11, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [11, 11, 11, 11, 12, 11, 11, 11],
        [16, 15, 14, 13, 10, 14, 15, 16],
      ],
    },
  };
}

export default function Home() {
  const [landingVisibility, setLandingVisibility] = useState(true);
  const [gameVisibility, setGameVisibility] = useState(false);
  const [buyPowerVisibility, setBuyPowerVisibility] = useState(false);
  const [infoVisibility, setInfoVisibility] = useState(false);

  const handleLandingClick = (event: SyntheticEvent) => {
    setGameVisibility(true);
    event.currentTarget.classList.remove("top-0");
    event.currentTarget.classList.add("top-full");
  };

  const handleBuyPower = (event: SyntheticEvent) => {
    setGameVisibility(false);
    setBuyPowerVisibility(true);
  };

  const handleBuyPowerClose = (event: SyntheticEvent) => {
    setGameVisibility(true);
    setBuyPowerVisibility(false);
  };

  const handleInfoToggle = (event: SyntheticEvent) => {
    if (infoVisibility) {
      setInfoVisibility(false);
      setGameVisibility(true);
    }
    else {
      setInfoVisibility(true);
      setGameVisibility(false);
      setBuyPowerVisibility(false);
    }
  };

  return (
    <>
      {landingVisibility ? (
        <button
          onClick={handleLandingClick}
          onTransitionEnd={() => setLandingVisibility(false)}
          className="cursor-pointer absolute transition-[top] duration-500 ease-in top-0 w-full h-full"
        >
          <Image
            src="/landing_retro_arcade.jpg"
            id="landing-image"
            alt="New Retro Arcade Neon"
            fill
            priority={true}
          />
        </button>
      ) : null}
      <div
        id="game-arcade-wrapper"
        className="bg-black h-screen max-h-screen max-w-full"
      >
        {gameVisibility ? (
          <GameOn
            infoHandler={handleInfoToggle}
            submitMoveHandler={() => alert("Move submit")}
            buyPowerHandler={handleBuyPower}
          />
        ) : null}
        {buyPowerVisibility ? (
          <BuyPower closeHandler={handleBuyPowerClose} infoHandler={handleInfoToggle} />
        ) : null}
        {infoVisibility ? (
          <Info closeHandler={handleInfoToggle} />
        ) : null}
      </div>
    </>
  );
}
