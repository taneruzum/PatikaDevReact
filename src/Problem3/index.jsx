import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import weatherIcons from './weatherIcons';
import WeatherContext from './WeatherContext';

async function fetchData(city) {

    //Go visual crossing site and sing up,
    //Find your API key, then paste it below where it says API_KEY

    try {
        const weatherResponse = await axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/next7days?unitGroup=metric&include=days%2Ccurrent&key=API_KEY&contentType=json`)

        const data = await weatherResponse.data;
        console.log(data);
        return data;
    } catch (error) {
        console.error('İstek başarısız!:', error.message);
        throw error;
    }
}

//for turkish
const gunAdlari = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];

// for english
//const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function convertDatetoDay(datetime) {
    let tarih = new Date(datetime);
    let gunIndex = tarih.getDay();
    return gunAdlari[gunIndex];
}

function WeatherApp() {

    const { citys, city, setCity, data, setData } = useContext(WeatherContext);

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
            <div className='w-[1400px] h-64 flex flex-col gap-4 p-5 text-black bg-[#FBFAF5] rounded-md'>
                <div className='w-full flex items-center justify-between'>
                    <select onChange={(e) => setCity(e.target.value)} className='border border-[#a5a5a5] px-4 py-1 rounded-lg cursor-pointer'>
                        {citys.map((city, index) => (
                            <option key={index} value={city}>
                                {city}
                            </option>
                        ))}
                    </select>
                    <div>
                        <span className='text-orange-500 text-xl font-bold '>8 Günlük Hava Durumu</span>
                    </div>
                </div>
                <div className='w-full flex items-center justify-between text-lg font-semibold '>
                    {data?.days.map((day, index) => (
                        <div key={index} className='w-36 h-40 flex flex-col items-center justify-between p-2 border border-[#a5a5a5] rounded-2xl shadow-inner shadow-[#444] transition-all duration-300 hover:bg-[#ffffff] hover:scale-110 cursor-pointer first:bg-blue-300 first:border-2 first:border-[#202020] first:hover:bg-blue-500'>
                            <span>{convertDatetoDay(day.datetime)}</span>
                            <img className='w-14 h-14 ' src={weatherIcons[day.icon]} alt="weather icon" />
                            <div className='w-full flex items-center justify-evenly text-sm text-center '>
                                <span>Max.</span>
                                <span>Min.</span>
                            </div>
                            <div className='w-full flex items-center justify-evenly text-lg'>
                                <span className=''>{day.tempmax}°C</span>
                                <span className='opacity-85'>{day.tempmin}°C</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default WeatherApp