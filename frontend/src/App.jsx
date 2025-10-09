import React, { useState } from "react";

export default function App() {
  // --- Hardcoded Movie List ---
  const movies = [
    {
      title: "Zindagi Na Milegi Dobara ",
      link: "https://youtu.be/gQEUkqZ33IA?si=XM4tA2_08sh4CZSA",
      category: "All Time Favourite",
    },
    {
      title: "Yeh Jawaani Hai Deewani",
      link: "https://youtu.be/WiaHoVh4lXc?si=ehtknQfeIt8KNckA",
      category: "All Time Favourite",
    },
    {
      title: "3 Idiots",
      link: "https://youtu.be/-xgiaLN-SLo?si=CGxBfTKaJoWP3qZe",
      category: "All Time Favourite",
    },
    {
      title: "The Shawshank Redemption",
      link: "https://www.youtube.com/watch?v=PLl99DlL6b4",
      category: "Drama",
    },
    {
      title: "Avengers: Endgame",
      link: "https://www.youtube.com/watch?v=TcMBFSGVi1c",
      category: "Action",
    },
  ];

  // Extract YouTube video ID
  const getVideoId = (url) => {
    const regex =
      /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const [selectedMovie, setSelectedMovie] = useState(null);

  // Group movies by category
  const groupedMovies = movies.reduce((groups, movie) => {
    const { category } = movie;
    if (!groups[category]) groups[category] = [];
    groups[category].push(movie);
    return groups;
  }, {});

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-10">
      {/* Header */}
      <header className="text-center mb-14">
        <h1 className="text-5xl sm:text-6xl font-extrabold bg-gradient-to-r from-red-500 via-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-lg">
          🎬 My Favorite Movies
        </h1>
        <p className="text-gray-400 mt-3 text-lg">
          Click a movie to watch it instantly in cinematic mode
        </p>
      </header>

      {/* Movie Grid by Category */}
      <div className="space-y-16">
        {Object.keys(groupedMovies).map((category) => (
          <div key={category}>
            <h2 className="text-3xl font-semibold mb-6 text-red-400 border-l-4 border-red-500 pl-3">
              {category}
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {groupedMovies[category].map((movie, index) => {
                const videoId = getVideoId(movie.link);
                const thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                return (
                  <div
                    key={index}
                    className="bg-gray-900 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl hover:scale-[1.03] transition-transform duration-300 cursor-pointer"
                    onClick={() => setSelectedMovie(videoId)}
                  >
                    <img
                      src={thumbnail}
                      alt={movie.title}
                      className="w-full h-60 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold truncate text-gray-100">
                        {movie.title}
                      </h3>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Video Player Modal */}
      {selectedMovie && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 px-4">
          <div className="relative w-full max-w-5xl aspect-video">
            <iframe
              className="w-full h-full rounded-2xl shadow-2xl"
              src={`https://www.youtube.com/embed/${selectedMovie}?autoplay=1`}
              title="YouTube video player"
              allowFullScreen
              allow="autoplay; encrypted-media"
            ></iframe>
            <button
              onClick={() => setSelectedMovie(null)}
              className="absolute top-3 right-3 bg-black/70 hover:bg-black/90 text-white text-3xl rounded-full px-4 pb-1"
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
