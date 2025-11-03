// import React, { useState, useMemo } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import SnakeGame from "./snake"; // adjust path if needed
// import Journoul from "./journoul";
// import snakeThumb from "@/assets/snake.png";
// import journel from "@/assets/Journel.png"
// import CanvasBoard from "./mindfullcolors";
// import canvas from "@/assets/Canvas.png"
// import FallingTypingGame from "./focus";
// import typinggame from "@/assets/typinggame.png"
// import MemoryMatchingGame from "./memorygame";
// import memory from "@/assets/Memory.png"
// import MeditationSounds from "./Meditation";
// import meditation from "@/assets/meditation.png";

// const SAMPLE_GAMES = [
// 	{
// 		id: "MeditationSounds",
// 		title: "Meditation Sounds",
// 		category: "Relax",
// 		thumb:meditation,
//     isRealGame: true,
// 		short: "To Relax your Mind select this to medidate.",
// 	},
// 	{
// 		id: "MemoryMatchingGame",
// 		title: "Memory Matching Game",
// 		category: "Memory",
// 		thumb: memory,
// 		players: "1",
//     isRealGame: true,
// 		short: "it Can enhance you memorizing skills.",
// 	},
// 	{
// 		id: "TypingGame",
// 		title: "Focus Typing Game",
// 		category: "Focus",
// 		thumb: typinggame,
// 		players: "1",
//     isRealGame: true,
// 		short: "Here you can check your attentive mind.",
// 	},
// 	{
// 		id: "CanvasBoard",
// 		title: "Mindful Colors",
// 		category: "Drawing",
// 		players: "1",
// 		short: "You can Draw your thougths to relex your mind.",
// 		isRealGame: true,
// 		thumb: canvas,
// 	},
// 	{
// 		id: "journel",
// 		title: "Journel",
// 		category: "Wellness",
// 		players: "1",
// 		short: "Reflect, write, and track your thoughts daily.",
// 		isRealGame: true,
// 		thumb: journel, // or use a local asset
// 	},
// 	{
// 		id: "snake",
// 		title: "Snake",
// 		category: "Arcade",
// 		players: "1",
// 		short: "Classic snake game. Eat, grow, and avoid crashing!",
// 		isRealGame: true, // custom flag to identify real games
// 		thumb: snakeThumb,
// 	},
// ];

// export default function SmallGameHub() {
// 	const [query, setQuery] = useState("");
// 	const [category, setCategory] = useState("All");
// 	const [selected, setSelected] = useState(null);
// 	const [playingGame, setPlayingGame] = useState(null);
// 	const categories = useMemo(
// 		() => ["All", ...new Set(SAMPLE_GAMES.map((g) => g.category))],
// 		[]
// 	);

// 	const filtered = useMemo(() => {
// 		return SAMPLE_GAMES.filter((g) => {
// 			const matchesQuery =
// 				g.title.toLowerCase().includes(query.toLowerCase()) ||
// 				g.short.toLowerCase().includes(query.toLowerCase());
// 			const matchesCat =
// 				category === "All" ? true : g.category === category;
// 			return matchesQuery && matchesCat;
// 		});
// 	}, [query, category]);

// 	if (playingGame === "snake") {
// 		return (
// 			<div className="min-h-screen   rounded-3xl bg-[rgba(255,255,255,0.57)] flex flex-col items-center justify-center">
// 				<button
// 					className="mb-6 px-5 py-2 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700 transition"
// 					onClick={() => setPlayingGame(null)}
// 				>
// 					← Back to Game Hub
// 				</button>
// 				<div >
// 					<SnakeGame />
// 				</div>
// 			</div>
// 		);
// 	}
//   if (playingGame === "CanvasBoard") {
// 		return (
// 			<div className="min-h-screen   rounded-3xl bg-[rgba(255,255,255,0.57)] flex flex-col items-center justify-center">
// 				<button
// 					className="mb-6 px-5 py-2 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700 transition"
// 					onClick={() => setPlayingGame(null)}
// 				>
// 					← Back to Game Hub
// 				</button>
// 				<div >
// 					<CanvasBoard />
// 				</div>
// 			</div>
// 		);
// 	}

// 	if (playingGame === "journel") {
// 		return (
// 			<div className="min-h-screen rounded-3xl bg-[rgba(255,255,255,0.57)] flex flex-col items-center justify-center">
// 				<button
// 					className="mb-6 px-5 py-2 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700 transition"
// 					onClick={() => setPlayingGame(null)}
// 				>
// 					← Back to Game Hub
// 				</button>
// 				<div className="bg-white rounded-2xl shadow-2xl p-6 max-w-xl w-full flex justify-center items-center">
// 					<Journoul />
// 				</div>
// 			</div>
// 		);
    
// 	}
// if (playingGame === "TypingGame") {
// 		return (
// 			<div className="min-h-screen rounded-3xl bg-[rgba(255,255,255,0.57)] flex flex-col items-center justify-center">
// 				<button
// 					className="mb-6 px-5 py-2 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700 transition"
// 					onClick={() => setPlayingGame(null)}
// 				>
// 					← Back to Game Hub
// 				</button>
// 				<div className="bg-white rounded-2xl shadow-2xl p-6 max-w-xl w-full flex justify-center items-center">
// 					<FallingTypingGame />
// 				</div>
// 			</div>
// 		);
    
// 	}
// if (playingGame === "MemoryMatchingGame") {
// 		return (
// 			<div className="min-h-screen rounded-3xl bg-[rgba(255,255,255,0.57)] flex flex-col items-center justify-center">
// 				<button
// 					className="mb-6 px-5 py-2 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700 transition"
// 					onClick={() => setPlayingGame(null)}
// 				>
// 					← Back to Game Hub
// 				</button>
// 				<div className="bg-white rounded-2xl shadow-2xl p-6 max-w-xl w-full flex justify-center items-center">
// 					<MemoryMatchingGame />
// 				</div>
// 			</div>
// 		);
// 	}
//   if (playingGame === "MeditationSounds") {
// 		return (
// 			<div className="min-h-screen rounded-3xl bg-[rgba(255,255,255,0.57)] flex flex-col items-center justify-center">
// 				<button
// 					className="mb-6 px-5 py-2 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700 transition"
// 					onClick={() => setPlayingGame(null)}
// 				>
// 					← Back to Game Hub
// 				</button>
// 				<div className="bg-white rounded-2xl shadow-2xl p-6 max-w-xl w-full flex justify-center items-center">
// 					<MeditationSounds />
// 				</div>
// 			</div>
// 		);
// 	}
// 	return (
// 		<div className="min-h-screen bg-[rgba(255,255,255,0.57)] rounded-3xl p-6 text-gray-900">
// 			<div className="max-w-7xl mx-auto">
// 				{/* Header */}
// 				<header className="flex items-center justify-between mb-6">
// 					<div>
// 						<h1 className="text-3xl font-extrabold tracking-tight">
// 							Game Hub
// 						</h1>
// 						<p className="text-gray-600 mt-1">
// 							Discover, preview and launch your favourite indie & arcade
// 							games.
// 						</p>
// 					</div>

// 					<div className="flex items-center gap-3">
// 						<div className="relative">
// 							<input
// 								value={query}
// 								onChange={(e) => setQuery(e.target.value)}
// 								placeholder="Search games or keywords..."
// 								className="w-72 px-3 py-2 rounded-md bg-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
// 							/>
// 						</div>

// 						<div className="flex items-center gap-2">
// 							<select
// 								value={category}
// 								onChange={(e) => setCategory(e.target.value)}
// 								className="px-3 py-2 rounded-md bg-gray-200"
// 							>
// 								{categories.map((c) => (
// 									<option key={c} value={c}>
// 										{c}
// 									</option>
// 								))}
// 							</select>
// 							<button
// 								onClick={() => {
// 									setQuery("");
// 									setCategory("All");
// 								}}
// 								className="px-3 py-2 rounded-md bg-gray-300 hover:bg-gray-400"
// 							>
// 								Reset
// 							</button>
// 						</div>
// 					</div>
// 				</header>
// 				{/* Grid */}
// 				<main>
// 					<div className="flex items-center justify-between mb-4">
// 						<h2 className="text-xl font-semibold">All Games</h2>
// 						<p className="text-gray-500">
// 							Showing {filtered.length} of {SAMPLE_GAMES.length}
// 						</p>
// 					</div>

// 					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
// 						{filtered.map((game) => (
// 							<motion.article
// 								key={game.id}
// 								layout
// 								whileHover={{ y: -6 }}
// 								className="bg-gradient-to-b from-white to-gray-100 rounded-2xl overflow-hidden shadow-lg cursor-pointer"
// 								onClick={() => setSelected(game)}
// 							>
// 								<div className="relative h-44">
// 									<img
// 										src={game.thumb}
// 										alt={game.title}
// 										className="w-full h-full object-contain bg-white"
// 									/>
									
// 								</div>

// 								<div className="p-4">
// 									<h3 className="font-semibold text-lg">{game.title}</h3>
// 									<p className="text-sm text-gray-600 mt-1">
// 										{game.short}
// 									</p>

// 									<div className="mt-3 flex items-center justify-between text-sm text-gray-500">
// 										<span className="px-2 py-1 bg-gray-200 rounded-md">
// 											{game.category}
// 										</span>
// 									</div>
// 								</div>
// 							</motion.article>
// 						))}

// 						{filtered.length === 0 && (
// 							<div className="col-span-full text-center text-gray-500 py-12">
// 								No games found for your search.
// 							</div>
// 						)}
// 					</div>
// 				</main>

// 				{/* Preview modal / side panel */}
// 				<AnimatePresence>
// 					{selected && (
// 						<motion.div
// 							initial={{ opacity: 0 }}
// 							animate={{ opacity: 1 }}
// 							exit={{ opacity: 0 }}
// 							className="fixed inset-0 z-40 flex items-end sm:items-center justify-center sm:justify-end p-4 pointer-events-none"
// 						>
// 							<motion.div
// 								initial={{ y: 40, scale: 0.98 }}
// 								animate={{ y: 0, scale: 1 }}
// 								exit={{ y: 20, opacity: 0 }}
// 								className="pointer-events-auto w-full sm:max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
// 							>
// 								<div className="relative h-44">
// 									<img
// 										src={selected.thumb}
// 										alt={selected.title}
// 										className="w-full h-full object-contain bg-white"
// 									/>
// 								</div>
// 								<div className="p-6">
// 									<div className="flex items-start justify-between">
// 										<div>
// 											<h3 className="text-2xl font-bold">
// 												{selected.title}
// 											</h3>
// 											<p className="text-sm text-gray-500">
// 												{selected.category} • {selected.players}
// 											</p>
// 										</div>
// 										<button
// 											onClick={() => setSelected(null)}
// 											className="ml-4 rounded-md px-3 py-2 bg-gray-200 hover:bg-gray-300"
// 										>
// 											Close
// 										</button>
// 									</div>

// 									<p className="text-gray-700 mt-4">
// 										{selected.short}
// 									</p>

// 									<div className="mt-6 flex gap-3">
// 										<button
// 											className="flex-1 rounded-2xl px-4 py-2 cursor-pointer bg-indigo-600 hover:bg-indigo-500 text-white"
// 											onClick={() => {
// 												if (selected.isRealGame && selected.id === "snake") {
// 													setPlayingGame("snake");
// 													setSelected(null);
// 												}
// 												if (selected.isRealGame && selected.id === "journel") {
// 													setPlayingGame("journel");
// 													setSelected(null);
// 												}
// 												if (selected.isRealGame && selected.id === "CanvasBoard") {
// 													setPlayingGame("CanvasBoard");
// 													setSelected(null);
// 												}
//                         if (selected.isRealGame && selected.id === "TypingGame") {
// 													setPlayingGame("TypingGame");
// 													setSelected(null);
// 												}
//                         if (selected.isRealGame && selected.id === "MemoryMatchingGame") {
// 													setPlayingGame("MemoryMatchingGame");
// 													setSelected(null);
// 												}
//                         if (selected.isRealGame && selected.id === "MeditationSounds") {
// 													setPlayingGame("MeditationSounds");
// 													setSelected(null);
// 												}
// 											}}
// 										>
// 											Play Demo
// 										</button>
// 										<button className="flex-1 rounded-2xl px-4 py-2 bg-gray-200 hover:bg-gray-300">
// 											View Details
// 										</button>
// 									</div>
// 								</div>
// 							</motion.div>
// 						</motion.div>
// 					)}
// 				</AnimatePresence>
// 			</div>
// 		</div>
// 	);
// }




import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SnakeGame from "./snake"; // adjust path if needed
import Journoul from "./journoul";
import snakeThumb from "@/assets/snake.png";
import journel from "@/assets/Journel.png";
import CanvasBoard from "./mindfullcolors";
import canvas from "@/assets/Canvas.png";
import FallingTypingGame from "./focus";
import typinggame from "@/assets/typinggame.png";
import MemoryMatchingGame from "./memorygame";
import memory from "@/assets/Memory.png";
import MeditationSounds from "./Meditation";
import meditation from "@/assets/meditation.png";

const SAMPLE_GAMES = [
  {
    id: "MeditationSounds",
    title: "Meditation Sounds",
    category: "Relax",
    thumb: meditation,
    isRealGame: true,
    short: "Soothing ambient sounds to relax and breathe.",
    players: "1",
  },
  {
    id: "MemoryMatchingGame",
    title: "Memory Matching",
    category: "Memory",
    thumb: memory,
    players: "1",
    isRealGame: true,
    short: "Gentle memory drills to sharpen attention.",
  },
  {
    id: "TypingGame",
    title: "Focus Typing",
    category: "Focus",
    thumb: typinggame,
    players: "1",
    isRealGame: true,
    short: "Calm typing practice to build focus.",
  },
  {
    id: "CanvasBoard",
    title: "Mindful Colors",
    category: "Drawing",
    players: "1",
    short: "Draw to express and release tension.",
    isRealGame: true,
    thumb: canvas,
  },
  {
    id: "journel",
    title: "Journoul",
    category: "Wellness",
    players: "1",
    short: "Reflect, write, and track your thoughts.",
    isRealGame: true,
    thumb: journel,
  },
  {
    id: "snake",
    title: "Snake",
    category: "Arcade",
    players: "1",
    short: "Light-hearted classic — quick fun breaks!",
    isRealGame: true,
    thumb: snakeThumb,
  },
];

export default function SmallGameHub() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState(null);
  const [playingGame, setPlayingGame] = useState(null);

  const categories = useMemo(
    () => ["All", ...new Set(SAMPLE_GAMES.map((g) => g.category))],
    []
  );

  const filtered = useMemo(() => {
    return SAMPLE_GAMES.filter((g) => {
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        g.title.toLowerCase().includes(q) ||
        g.short.toLowerCase().includes(q) ||
        (g.category && g.category.toLowerCase().includes(q));
      const matchesCat = category === "All" ? true : g.category === category;
      return matchesQuery && matchesCat;
    });
  }, [query, category]);

  // Play screens for game components (keeps same logic)
  if (playingGame === "snake") {
    return (
      <PlayShell onBack={() => setPlayingGame(null)}>
        <SnakeGame />
      </PlayShell>
    );
  }
  if (playingGame === "CanvasBoard") {
    return (
      <PlayShell onBack={() => setPlayingGame(null)}>
        <CanvasBoard />
      </PlayShell>
    );
  }
  if (playingGame === "journel") {
    return (
      <PlayShell onBack={() => setPlayingGame(null)}>
        <Journoul />
      </PlayShell>
    );
  }
  if (playingGame === "TypingGame") {
    return (
      <PlayShell onBack={() => setPlayingGame(null)}>
        <FallingTypingGame />
      </PlayShell>
    );
  }
  if (playingGame === "MemoryMatchingGame") {
    return (
      <PlayShell onBack={() => setPlayingGame(null)}>
        <MemoryMatchingGame />
      </PlayShell>
    );
  }
  if (playingGame === "MeditationSounds") {
    return (
      <PlayShell onBack={() => setPlayingGame(null)}>
        <MeditationSounds />
      </PlayShell>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-[#FFFBF2] via-[#F3F8FF] to-[#F7FFF7]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-[#6EE7B7] via-[#60A5FA] to-[#C084FC] bg-clip-text text-transparent">
              🌿 Calm Game Hub
            </h1>
            <p className="text-slate-600 mt-2 max-w-xl">
              Short, gentle games and mindful tools to restore focus, relax, or take a quick mood-boosting break.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-72">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search games or feelings..."
                className="w-full px-4 py-3 rounded-2xl bg-white/70 backdrop-blur-sm border border-white/50 shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#60A5FA]"
              />
            </div>

            <div className="flex items-center gap-2">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="px-4 py-3 rounded-2xl bg-white/70 border border-white/50 shadow-sm"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>

              <button
                onClick={() => {
                  setQuery("");
                  setCategory("All");
                }}
                className="px-4 py-3 rounded-2xl bg-white/60 border border-white/40 shadow-sm hover:scale-105 transition"
              >
                Reset
              </button>
            </div>
          </div>
        </header>

        {/* Summary */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-sm text-slate-700">Showing {filtered.length} of {SAMPLE_GAMES.length}</div>
          <div className="text-sm text-slate-500">Take a 5–10 minute break — small steps matter 🌸</div>
        </div>

      {/* Grid */}
<main>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {filtered.map((game, idx) => {
      // 🌈 Gradient palette per card (loops if more games)
      const gradients = [
        "from-pink-200 via-pink-300 to-rose-200",   // soft rosy
        "from-green-200 via-emerald-200 to-teal-200", // calming green
        "from-blue-200 via-sky-300 to-indigo-200",  // sky calm
        "from-yellow-200 via-orange-200 to-amber-200", // sunshine
        "from-purple-200 via-violet-300 to-fuchsia-200", // dreamy purple
        "from-teal-200 via-cyan-200 to-blue-200", // oceanic
      ];
      const gradient = gradients[idx % gradients.length];

      return (
        <motion.article
          key={game.id}
          layout
          whileHover={{ y: -8, scale: 1.02 }}
          className={`relative rounded-2xl overflow-hidden shadow-lg cursor-pointer bg-gradient-to-br ${gradient}`}
          onClick={() => setSelected(game)}
        >
          {/* Overlay to soften colors */}
          <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]" />

          {/* Content */}
          <div className="relative z-10 p-4 min-h-[220px] flex flex-col">
            <div className="h-36 flex items-center justify-center">
              <img
                src={game.thumb}
                alt={game.title}
                className="max-h-28 object-contain drop-shadow-lg"
              />
            </div>

            <div className="mt-3 flex-1">
              <h3 className="text-lg font-semibold text-slate-800 drop-shadow-sm">
                {game.title}
              </h3>
              <p className="text-sm text-slate-700 mt-1">{game.short}</p>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs px-3 py-1 rounded-full bg-white/60 text-slate-700 border border-white/40">
                {game.category}
              </span>
              <span className="text-xs text-slate-600">{game.players} player</span>
            </div>
          </div>
        </motion.article>
      );
    })}

    {filtered.length === 0 && (
      <div className="col-span-full text-center text-slate-500 py-12">
        No games match your search — try a different keyword.
      </div>
    )}
  </div>
</main>

        {/* Preview Panel */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 flex items-end sm:items-center justify-center sm:justify-end p-4 pointer-events-none"
            >
              <motion.div
                initial={{ y: 40, scale: 0.98 }}
                animate={{ y: 0, scale: 1 }}
                exit={{ y: 20, opacity: 0 }}
                className="pointer-events-auto w-full sm:max-w-lg bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-white/50"
              >
                <div className="h-44 flex items-center justify-center bg-gradient-to-tr from-[#E8FDF5] to-[#F3F7FF]">
                  <img src={selected.thumb} alt={selected.title} className="max-h-32 object-contain" />
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-800">{selected.title}</h3>
                      <p className="text-sm text-slate-600 mt-1">{selected.category} • {selected.players} player</p>
                    </div>
                    <button
                      onClick={() => setSelected(null)}
                      className="ml-4 rounded-full px-3 py-2 bg-white/60 border border-white/40 hover:bg-white"
                    >
                      Close
                    </button>
                  </div>

                  <p className="text-slate-700 mt-4">{selected.short}</p>

                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      className="w-full rounded-2xl px-4 py-3 bg-gradient-to-r from-[#60A5FA] to-[#8B5CF6] text-white shadow-md"
                      onClick={() => {
                        // Launch the selected game's real view if flagged
                        if (selected.isRealGame) setPlayingGame(selected.id);
                        setSelected(null);
                      }}
                    >
                      Play Demo
                    </button>

                    <a
                      className="w-full rounded-2xl px-4 py-3 bg-white/60 border border-white/40 text-center"
                      href="#"
                      onClick={(e) => e.preventDefault()}
                    >
                      View Details
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function PlayShell({ children, onBack }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-6 bg-gradient-to-br from-[#F7FFF7] via-[#F3F8FF] to-[#FFF8FB]">
      <div className="w-full max-w-4xl mt-6">
        <button
          onClick={onBack}
          className="mb-4 px-5 py-2 rounded-full bg-white/80 border border-white/40 shadow-sm hover:scale-105"
        >
          ← Back to Game Hub
        </button>
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-xl">{children}</div>
      </div>
    </div>
  );
}