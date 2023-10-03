import jwt_decode from "jwt-decode";

export const createOrGetUser = async (response) => {
  const decoded = jwt_decode(response.credential);

  const { name, sub } = decoded;

  const user = {
    _id: sub,
    _type: "user",
    username: name,
  };
};
