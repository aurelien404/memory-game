import { useEffect, useState } from "react";

const memoryItems = [
  { id: 1, value: "🍑" },
  { id: 2, value: "🍇" },
  { id: 3, value: "🍌" },
  { id: 4, value: "🍓" },
  { id: 5, value: "🍉" },
  { id: 6, value: "🍍" },
  { id: 7, value: "🥝" },
  { id: 8, value: "🍒" },
];

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

export default function MemoryGame() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);

  const pairsCount = 16;

  const initGame = () => {
    const selected = shuffle(memoryItems).slice(0, pairsCount);
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

  return (
    <div className="mx-auto text-center space-y-4">
      <div
        className={`grid grid-cols-4 gap-1 w-[300px] h-[300px] md:w-[400px] md:h-[400px] mx-auto`}
      >
        {cards.slice(0, pairsCount).map((card, index) => {
          const isFlipped =
            flipped.includes(index) || matched.includes(card.id);
          return (
            <div
              key={card.uniqueId}
              onClick={() => handleClick(index)}
              className="w-full h-full perspective cursor-pointer"
            >
              <div
                className={`hover:scale-95 relative w-full h-full ease-out duration-250 transform preserve-3d ${
                  isFlipped ? "rotate-y-180" : ""
                }`}
              >
                <div className="absolute inset-0 bg-zzlink text-4xl flex items-center justify-center rounded-xs backface-hidden"></div>
                <div className="absolute inset-0 bg-zzlink text-4xl flex items-center justify-center rounded-xs rotate-y-180 backface-hidden">
                  {card.value}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={initGame}
          className="border-2 border-zzlink text-zzlink px-5 py-2 transition-all ease-in-out duration-150 hover:scale-110 active:scale-90"
        >
          Restart
        </button>
        <div className="text-lg text-zzbase font-bold">Moves: {moves}</div>
      </div>
    </div>
  );
}
