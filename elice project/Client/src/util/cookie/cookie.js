import { Cookies } from "react-cookie";
const cookies = new Cookies();

export const setCookie = (key, data, path) => {
    return cookies.set(key, data, { ...path });
}

export const getCookie = (key) => {
    return cookies.get(key);
}

export const removeCookie = (key) => {
    return cookies.remove(key);
}