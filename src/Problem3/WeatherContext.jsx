import { createContext, useState } from 'react';

const WeatherContext = createContext();

export function WeatherProvider({ children }) {
    const [citys, setCitys] = useState(["İstanbul", "Ankara", "İzmir"]);
    const [city, setCity] = useState("İstanbul");
    const [data, setData] = useState(null);

    return (
        <WeatherContext.Provider value={{ citys, city, setCity, data, setData }}>
            {children}
        </WeatherContext.Provider>
    );
}

export default WeatherContext;
