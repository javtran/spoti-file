"use client";
import GetToken from "@/spotify";
import dynamic from "next/dynamic";

const Login = dynamic(() => import("./components/Login"), { ssr: false });
const Tracks = dynamic(() => import("./components/Tracks"), { ssr: false });
export default function Page() {
  const token = GetToken();
  return (
    <main className="h-screen font-sans text-white ">
      {!token ? <Login /> : <Tracks />}
    </main>
  );
}
