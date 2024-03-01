import { userData } from "@/types/common.type";
import { createSlice } from "@reduxjs/toolkit";
import { destroyCookie } from "nookies";
import { userSliceData } from "../interfaces/interfaces";
import { boolean } from "yup";
import { setUserAccessToken } from "@/api/axiosInstance";
import { deleteCookie } from "cookies-next";

const initialState: userSliceData = {
  isLoggedIn: false,
  userData: null,
  accessToken: null
};

export const userSlice = createSlice({
  name: "userSlice",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setLogInData: (state, { payload }: { payload: userData }) => {
      // console.log("payload user Data",payload)
      state.userData = payload;
    },

    setAccessToken: (state, { payload }: { payload: string | null }) => {
      state.accessToken = payload;
      state.isLoggedIn = Boolean(payload);
      setUserAccessToken(payload);
    },

    logout: (state) => {
      state.isLoggedIn = false;
      state.userData = null;
      state.accessToken = null;
      deleteCookie("token");

      //destroyCookie(null, process.env.NEXT_APP_TOKEN_NAME!, { path: "/" });

      // cookie.remove("privy_token");
      // cookie.remove("user");

      // destroyCookie(null, "user", { path: "/" });

      // window.location.href = "/login";
    }
  },
  extraReducers: {}
});

export const { setLogInData, setAccessToken, logout } = userSlice.actions;

export default userSlice.reducer;
