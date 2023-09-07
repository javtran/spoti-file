"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Login from "./components/login";

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
        const hash = window.location.hash;
        let token = window.localStorage.getItem("token");

        if (!token && hash) {
            token = hash
                .substring(1)
                .split("&")
                .find((elem) => elem.startsWith("access_token"))
                .split("=")[1];

            window.location.hash = "";
            window.localStorage.setItem("token", token);
        }
        setToken(token);
        console.log(token);
    }, []);

    return (
        <main className="flex flex-col justify-center gap-8 items-center h-screen ">
            {!token ? <Login /> : <div></div>}
        </main>
    );
}
