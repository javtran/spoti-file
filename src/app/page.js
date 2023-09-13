"use client";
import Login from "./components/Login";
import Tracks from "./components/Tracks";
import getToken from "@/spotify";
export default function Home() {
  const token = getToken();
  return (
    <main className="h-screen bg-[#191414] font-sans text-white ">
      {!token ? <Login /> : <Tracks />}
    </main>
  );
}
