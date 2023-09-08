import Link from "next/link";

const Login = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <h1 className="text-9xl tracking-wide font-semibold">
        <span className="text-[#1DB954]">Spoti</span>-File
      </h1>
      <p className="text-xl mt-4">Learn about the songs you listen to.</p>
      <Link
        className="inline-block p-4 bg-white text-black font-semibold tracking-wide uppercase rounded-full hover:scale-110 focus:scale-110 active:bg-stone-500 transform transition-transform duration-200 mt-8"
        href={"http://localhost:8000/login"}
      >
        Login to Spotify
      </Link>
    </div>
  );
};

export default Login;
