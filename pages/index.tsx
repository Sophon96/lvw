import Board from "../components/Board";
import { Tuple } from "../types/basic";

interface IndexProps {
  games: {
    board: Tuple<Tuple<number, 8>, 8>;
    whiteMoves: { from: [number, number]; to: [number, number] }[];
    blackMoves: { from: [number, number]; to: [number, number] }[];
    leelaSide: number;
  }[];
}

export async function getServerSideProps() {
  // TODO: Actually get data from the database
  return {
    props: {
      games: [
        {
          // this looks wrong but it's actually correct
          board: [
            [6, 1, 0, 0, 0, 0, 7, 12],
            [5, 1, 0, 0, 0, 0, 7, 11],
            [4, 1, 0, 0, 0, 0, 7, 10],
            [3, 1, 0, 0, 0, 0, 7, 9],
            [0, 2, 0, 1, 7, 0, 8, 0],
            [4, 1, 0, 0, 0, 0, 7, 10],
            [5, 1, 0, 0, 0, 0, 7, 11],
            [6, 1, 0, 0, 0, 0, 7, 12],
          ],
          whiteMoves: [
            { from: [6, 4], to: [4, 4] },
            { from: [7, 4], to: [6, 4] },
          ],
          blackMoves: [
            { from: [1, 4], to: [3, 4] },
            { from: [0, 4], to: [1, 4] },
          ],
          leelaSide: 1,
        },
      ],
    },
  };
}

export default function Home(props: IndexProps) {
  return (
    <>
      <div
        id="wrapper"
        className="bg-black h-screen w-full max-h-screen max-w-full p-10"
      >
        <div className="h-full w-full flex flex-col">
          <div className="h-full w-full flex flex-row">
            <Board />
          </div>
        </div>
      </div>
    </>
  );
}
