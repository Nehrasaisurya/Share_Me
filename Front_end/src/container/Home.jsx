import React, { useState, useEffect, useRef } from "react";
import { HiMenu } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link, Route, Routes } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import UserProfile from "../components/UserProfile";
import logo from "../assets/logo.png";
import Pins from "./Pins";
import { client } from "../client";
import { userQuery } from "../util/data";

const Home = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [user, setUser] = useState(null);

  const userInfo =
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();

  useEffect(() => {
    const query = userQuery(userInfo?.googleId);
    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, []);

  return (
    <div className="flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out">
      <div className="hidden md:flex h-screen flex-initial">
        <Sidebar />
      </div>
      <div className="flex md:hidden flex-row">
        <HiMenu
          fontSize={40}
          className="cursor-pointer"
          onClick={() => setToggleSidebar(false)}
        />
        <Link to="/">
          <img src={logo} alt="..." className="w-28" />
        </Link>
        <Link to={`user-profile/${user?._id}`}>
          <div className="w-[50px] h-[50px] rounded-full bg-slate-800 text-white font-bold flex items-center justify-center">
            {(userInfo?.name).charAt(0)}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;
