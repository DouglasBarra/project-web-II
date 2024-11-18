export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-center bg-gradient-to-r from-green-400 via-teal-500 to-blue-500">
      <div className="space-y-8 text-center px-6 md:px-12">
        <h1 className="text-5xl md:text-6xl font-bold text-white drop-shadow-lg">
          Gest' O
        </h1>
        <p className="text-lg md:text-xl text-white opacity-80">
          Cuidar de você deve ser simples
        </p>
        <div className="mt-8">
          <a 
            href="/gesto/login"
            className="px-8 py-3 text-lg text-white font-semibold bg-teal-600 hover:bg-teal-700 rounded-lg shadow-md transition duration-300 transform hover:scale-105"
          >
            Login
          </a>
        </div>
      </div>
    </main>
  );
}
