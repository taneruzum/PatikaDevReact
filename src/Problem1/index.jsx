// Problem1.jsx
import React, { useEffect } from 'react';
import getData from "./getData";

function Problem1() {
    useEffect(() => {
        async function fetchData() {
            try {
                //Sadece userId'si 1 olan kullanıcı için
                const userId = 1;
                const result = await getData(userId);

                console.log(result);

            } catch (error) {
                console.error('Veri çekme hatası!:', error.message);
            }
        }

        fetchData();
    }, []);

    return (
        <>
        </>
    );
}

export default Problem1;
