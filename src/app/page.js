"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Login from "./components/Login";
import Profile from "./components/profile";
import Tracks from "./components/Tracks";

export default function Home() {
  const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("");

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  const searchArtists = (e) => {
    let header = Headers();
    header.append("Authorization", `Bearer ${token}`);
  };

  useEffect(() => {
    let token = window.localStorage.getItem("token");
    setToken(token);
  }, []);

  return (
    <main className="h-screen bg-[#191414] font-sans text-white ">
      {!token ? (
        <Login />
      ) : (
        <div>
          {/* <a onClick={logout}>logout</a>
          <Profile /> */}
          <Tracks />
        </div>
      )}
    </main>
  );
}
