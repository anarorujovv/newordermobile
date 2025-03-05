import { createContext, useEffect, useRef, useState } from "react";

export const WifiGlobalContext = createContext();

export const WifiGlobalProvider = (props) => {

    const [wifi, setWifi] = useState(true);
    const searchRef = useRef(null);

    return (
        <WifiGlobalContext.Provider value={
            {
                wifi,
                setWifi,
                searchRef
            }
        }>
            {props.children}
        </WifiGlobalContext.Provider>
    );

}