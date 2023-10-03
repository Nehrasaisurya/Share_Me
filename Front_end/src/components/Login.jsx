import React from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import shareVideo from "../assets/share.mp4";
import logo from "../assets/logowhite.png";
import jwt_decode from "jwt-decode";
import { client } from "../client";

const Login = () => {
  const navigate = useNavigate();
  const createOrGetUser = async (response) => {
    const decoded = jwt_decode(response.credential);
    localStorage.setItem("user", JSON.stringify(decoded));

    const { name, sub } = decoded;

    const doc = {
      _id: sub,
      _type: "user",
      userName: name,
    };

    client.createIfNotExists(doc).then(() => {
      navigate("/", { replace: true });
    });
  };

  const user = false;

  return (
    <div className="flex justify-start items-start flex-col h-screen">
      <div className="relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 bottom-0 left-0 bg-blackOverlay">
          <div className="p-5">
            <img src={logo} alt="logo" width="130px" />
          </div>
          <div className="shadow-2xl">
            {user ? (
              <div>Logged in</div>
            ) : (
              <GoogleLogin
                onSuccess={(response) => createOrGetUser(response)}
                onError={() => console.log("error")}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
