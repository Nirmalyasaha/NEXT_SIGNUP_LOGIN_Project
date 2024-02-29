import { BaseApiResponse } from "@/interface/common.interface";
import {
  globalCatchError,
  globalCatchSucess,
  globalCatchWarning
} from "@/lib/functions/_helpers.lib";
import axios, { AxiosError, AxiosResponse } from "axios";
import { parseCookies } from "nookies";
import {  baseUrlApi, sucessNotificationEndPoints } from "../endpoints";
// import { refreshAccessToken } from "../functions/user.api";

const axiosInstance = axios.create({
  baseURL: baseUrlApi
});

let accessToken: string | null = null;

export const setUserAccessToken = (_accessToken: typeof accessToken) => {
  accessToken = _accessToken;
};
export const getUserAccessToken = () => {
  return accessToken;
};

// let refreshToken: string | null = null;
// export const setUserRefreshToken = (_refreshToken: typeof accessToken) => {
//   refreshToken = _refreshToken;
// };
// export const getUserRefreshToken = () => {
//   return refreshToken;
// };

axiosInstance.interceptors.request.use((config) => {
  const token = getUserAccessToken();
  if (token) {
    console.log("token get on Header:-", token);
    config.headers["Authorization"] = `${token}`;
  }

  return config;
});




// axiosInstance.interceptors.request.use((config) => {
//   const cookies = parseCookies();

//   const token = cookies[process.env.NEXT_APP_TOKEN_NAME!];
//   if (token && !!config.headers) {
//     config.headers["x-access-token"] = `${token}`;
//   }

//   return config;
// });

// axiosInstance.interceptors.response.use(
//   (res: AxiosResponse) => {
//     // only show success notification on this routes

//     if (sucessNotificationEndPoints.includes(res.config.url as string)) {
//       if (res?.data?.status !== 200) {
//         globalCatchWarning(res);
//       } else {
//         globalCatchSucess(res);
//       }
//     }

//     return res;
//   },
//   async (error: AxiosError<BaseApiResponse>) => {
//     globalCatchError(error);
    // const { data, status, config } = error.response!;
    // const originalRequest = error.config;

    // if (error.response.status === 401 && !originalRequest._retry) {
    //   originalRequest._retry = true;
    //   const access_token = await refreshAccessToken();
    //   setCookieClient("token", access_token?.token);
    //   axios.defaults.headers.common["x-access-token"] = access_token?.token;
    //   return axiosInstance(originalRequest);
    // }

   // return Promise.reject(error);

    // switch (status) {
    //   case 400:
    //     console.error(data);
    //     break;

    //   case 401:
    //     console.error("unauthorized");
    //     break;

    //   case 404:
    //     console.error("/not-found");
    //     break;

    //   case 500:
    //     console.error("/server-error");
    //     break;
    // }
    // return Promise.reject(error);
  

export default axiosInstance;
