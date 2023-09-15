"use client";
import GetToken from "@/spotify";
import Login from "./components/Login";
import Tracks from "./components/Tracks";
export default function Page() {
  const token = GetToken();
  return (
    <main className="h-screen font-sans text-white ">
      {!token ? <Login /> : <Tracks />}
    </main>
  );
}
