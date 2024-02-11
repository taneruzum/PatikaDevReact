import React, { useEffect, useState } from 'react'
import axios from 'axios';
import weatherIcons from './weatherIcons';

async function fetchData(city) {

    try {
        const weatherResponse = await axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/next7days?unitGroup=metric&include=days%2Ccurrent&key=ALBWLQLK35EJ4AX87GFG2B5VH&contentType=json`)

        const data = await weatherResponse.data;
        console.log(data);
        return data;
    } catch (error) {
        console.error('İstek başarısız!:', error.message);
        throw error;
    }
}

//Context API kullanılmalı
//Günlerin listelendiği kartlarda; gün adı, hava durumu görseli(güneşli, yağmurlu, karlı, parçalı bulutlu), en yüksek ve en düşük sıcaklık gösterilmelidir.

{/* <div>
    <img className='w-20 h-20' src={weatherIcons['clear-day']} alt="weather icon" />
</div> */}


function WeatherApp() {

    const [citys, setCitys] = useState(["İstanbul", "Ankara", "İzmir"])
    const [city, setCity] = useState("İstanbul")
    const [data, setData] = useState(null)

    useEffect(() => {
        fetchData(city).then(data => setData(data))
    }, [city])

    const handleFunc = (index) => {
        return () => {
            setCity(citys[index]);
        }
    }


    return (
        <>
            <div className='w-full h-40 flex items-center justify-center gap-10 text-black'>
                <select onChange={(e) => setCity(e.target.value)} className='border border-white px-4 py-1 rounded-3xl'>
                    {citys.map((city, index) => (
                        <option key={index} value={city}>
                            {city}
                        </option>
                    ))}
                </select>
            </div>

        </>
    )

}

export default WeatherApp