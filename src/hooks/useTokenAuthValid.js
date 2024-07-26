import { useEffect } from "react";
import { useState } from "react";
import { isTokenValid } from "../utils/jwtDecode";

const useTokenAuthValid = () => {
  const [isAuthValid, setIsAuthValid] = useState(true);
  const [isValidUser, setIsValidUser] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.token) {
      const validToken = isTokenValid(user?.token);
      setIsAuthValid(validToken);
      const validUser =
        (user?.email !== null && user?.role !== null) || user === null;
      setIsValidUser(validUser);
    }
  }, []);

  return { isAuthValid, isValidUser };
};

export default useTokenAuthValid;
