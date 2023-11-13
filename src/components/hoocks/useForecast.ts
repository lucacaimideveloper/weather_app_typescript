import { useState, useEffect, ChangeEvent } from "react";
import { forecastType, optionType } from "../Icons/types/index";

const useForecast = () => {
  const [term, setTerm] = useState<string>("");
  const [city, setCity] = useState<optionType | null>(null);
  const [option, setOption] = useState<[]>([]);
  const [forecast, setForecast] = useState<forecastType | null>(null);
  //
  //
  const getSearchOption = (value: string) => {
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${value.trim()}&limit=5&appid=f281ad23c454d69d7b050e565c983d52`
    )
      .then((res) => res.json())
      .then((data) => setOption(data));
  };

  //
  // e is an inplicit type, tell to the code that is expentig something
  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setTerm(value);

    if (value === "") return;

    getSearchOption(value);
  };
  //
  //
  const getForecast = (city: optionType) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&unit=metric&appid=f281ad23c454d69d7b050e565c983d52`
    )
      .then((res) => res.json())
      .then((data) => {
        const forecastData = {
          ...data.city,
          list: data.list.slice(0, 16),
        };
        setForecast(forecastData);
      })
      .catch((e) => console.log(e));
  };

  //
  //
  const onSubmit = () => {
    if (!city) return;

    getForecast(city);
  };

  const optionSelect = (item: optionType) => {
    setCity(item);
  };
  //
  //use effect reset the search, but will use the city selected as the new state
  useEffect(() => {
    if (city) {
      setTerm(city.name);
      setOption([]);
    }
  }, [city]);
  return {
    term,
    option,
    forecast,
    onChangeInput,
    optionSelect,
    onSubmit,
  };
};

export default useForecast;
