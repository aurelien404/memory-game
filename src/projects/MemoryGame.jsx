import { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";

const memoryItems = [
  { id: 1, value: "🍑" },
  { id: 2, value: "🍇" },
  { id: 3, value: "🍌" },
  { id: 4, value: "🍓" },
  { id: 5, value: "🍉" },
  { id: 6, value: "🍍" },
  { id: 7, value: "🥝" },
  { id: 8, value: "🍒" },
  { id: 9, value: "🍏" },
  { id: 10, value: "🍎" },
  { id: 11, value: "🍐" },
  { id: 12, value: "🥥" },
  { id: 13, value: "🍋" },
  { id: 14, value: "🍊" },
  { id: 15, value: "🫐" },
  { id: 16, value: "🍈" },
  { id: 17, value: "🍠" },
  { id: 18, value: "🍅" },
  { id: 19, value: "🌽" },
  { id: 20, value: "🥭" },
  { id: 21, value: "🫒" },
  { id: 22, value: "🍆" },
  { id: 23, value: "🥑" },
  { id: 24, value: "🥒" },
  { id: 25, value: "🌶️" },
  { id: 26, value: "🥬" },
  { id: 27, value: "🥕" },
  { id: 28, value: "🧄" },
  { id: 29, value: "🧅" },
  { id: 30, value: "🥔" },
  { id: 31, value: "🥦" },
  { id: 32, value: "🫛" },
];

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

export default function MemoryGame() {
  const [level, setLevel] = useState("medium");
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [pairsCount, setPairsCount] = useState(8);

  const styleBtn =
    "text-emerald-500 font-bold hover:scale-150 active:scale-90 duration-250 ease-in";

  const initGame = (selectedLevel = level) => {
    let count;
    switch (selectedLevel) {
      case "easy":
        count = 8;
        break;
      case "medium":
        count = 18;
        break;
      case "hard":
        count = 32;
        break;
      default:
        count = 8;
    }
    setPairsCount(count);
    const selected = shuffle(memoryItems).slice(0, count);
    const doubled = [...selected, ...selected];
    const shuffled = shuffle(
      doubled.map((item, index) => ({
        ...item,
        uniqueId: index,
      }))
    );
    setCards(shuffled);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
  };

  useEffect(() => {
    initGame();
  }, []);

  const handleClick = (index) => {
    if (
      flipped.length === 2 ||
      flipped.includes(index) ||
      matched.includes(cards[index].id)
    )
      return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [firstIdx, secondIdx] = newFlipped;
      const firstCard = cards[firstIdx];
      const secondCard = cards[secondIdx];
      setMoves((prev) => prev + 1);

      if (firstCard.id === secondCard.id) {
        setMatched((prev) => [...prev, firstCard.id]);
      }

      setTimeout(() => setFlipped([]), 1000);
    }
  };

  const changeLevel = (newLevel) => {
    setLevel(newLevel);
    initGame(newLevel);
  };

  const getGridClass = () => {
    switch (level) {
      case "easy":
        return "grid-cols-4";
      case "medium":
        return "grid-cols-6";
      case "hard":
        return "grid-cols-8";
      default:
        return "grid-cols-4";
    }
  };

  return (
    <>
      <div className="w-full min-h-screen bg-violet-950 flex flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl md:text-4xl text-white font-extrabold text-center">
            Memory game.
          </h1>
          <p className="text-md text-white flex flex-row justify-center gap-6 p-6 text-3xl">
            <a
              href="https://github.com/aurelien404/memory-game"
              className={`${styleBtn}`}
            >
              <FaGithub />
            </a>
            <a href="https://aurelienj.ch" className={`${styleBtn}`}>
              <TbWorld />
            </a>
          </p>
        </div>
        <div className="space-y-4 flex flex-col items-center justify-center md:space-y-4 py-4 px-4">
          <div className="flex gap-3 md:gap-4">
            {["easy", "medium", "hard"].map((lvl) => (
              <button
                key={lvl}
                onClick={() => changeLevel(lvl)}
                className={`px-4 py-2 border-2 text-white capitalize transition-all ease-in-out duration-150 hover:scale-110 active:scale-90 cursor-pointer ${
                  level === lvl
                    ? " text-violet-900 font-bold"
                    : "border-white hover:bg-white hover:text-violet-900"
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>

          <div
            className={`grid ${getGridClass()} gap-2 w-[90vw] md:w-[400px] max-w-full md:max-w-none`}
          >
            {cards.map((card, index) => {
              const isFlipped =
                flipped.includes(index) || matched.includes(card.id);
              return (
                <div
                  key={card.uniqueId}
                  onClick={() => handleClick(index)}
                  className={` aspect-square w-full perspective cursor-pointer`}
                >
                  <div
                    className={`hover:scale-95 relative w-full h-full ease-out duration-250 transform preserve-3d ${
                      isFlipped ? "rotate-y-180" : ""
                    }`}
                  >
                    <div className="absolute inset-0 border-2 border-violet-300 bg-violet-300 rounded backface-hidden"></div>
                    <div
                      className={`absolute inset-0 border-2 border-white bg-white p-1 flex items-center justify-center rounded rotate-y-180 backface-hidden
                              ${
                                level === "easy"
                                  ? "text-5xl"
                                  : level === "medium"
                                  ? "text-4xl"
                                  : "text-2xl"
                              }
                            `}
                    >
                      {card.value}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => initGame()}
              className="border-2 border-white text-white px-5 py-2 transition-all ease-in-out duration-150 hover:scale-110 active:scale-90 cursor-pointer"
            >
              Restart
            </button>
            <div className="text-lg text-white font-bold">Moves: {moves}</div>
          </div>
        </div>
      </div>
    </>
  );
}
