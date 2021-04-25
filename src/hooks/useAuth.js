import { useEffect } from "react";
import { useAsync } from "react-hook-async";
import { useDispatch } from "react-redux";
import axios from "axios";

const fetchMeApi = (jwt) => {
  return axios
    .get("http://localhost:4000/auth/me", {
      headers: {
        Authorization: "Bearer " + jwt,
      },
    })
    .then((res) => res.data);
};
export const useAuth = () => {
  const dispatch = useDispatch();
  const [fetchMeApiData, executeFetchMe] = useAsync({}, fetchMeApi);
  useEffect(() => {
    const jwt = localStorage.getItem("token");
    executeFetchMe(jwt).then((user) => {
      dispatch({ type: "DATA_LOGIN", payload: user });
    });
  }, [executeFetchMe, dispatch]);
  return fetchMeApiData;
};
