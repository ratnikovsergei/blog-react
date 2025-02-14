import { useEffect, useState } from 'react';

export const WeatherWidget = () => {
  const [city, setCity] = useState();
  const [temp, setTemp] = useState();
  const [weatherDesc, setweatherDesc] = useState();

  const now = new Date().toLocaleString('ru', { day: 'numeric', month: 'long' });

  useEffect(() => {
    fetch(
      'https://api.openweathermap.org/data/2.5/weather?q=Saint+Petersburg&units=metric&lang=ru&appid=684b77b82ffcd3bbd33b25e5d3fc05f2'
    )
      .then((res) => res.json())
      .then(({ name, main, weather }) => {
        setCity(name);
        setTemp(Math.round(main.temp));
        setweatherDesc(weather[0].description);
      });
  }, []);

  return (
    <div>
      <div className="font-semibold">{now}</div>
      <div>
        {city} <span className="temperature">{temp} &deg;C</span>
      </div>
      <div>{weatherDesc}</div>
    </div>
  );
};
