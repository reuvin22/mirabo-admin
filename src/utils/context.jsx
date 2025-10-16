import { createContext, useContext } from "react";

export const UserContext = createContext({
    data: null,
    setData: () => {}
})

export const Navigation = createContext({
    expande: false
})

export const navigateContext = () => useContext(Navigation);
export const userContext = () => useContext(UserContext);