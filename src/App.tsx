import SearchSection from "../src/components/SearchSection";
import useForecast from "./components/hoocks/useForecast";
import Forecast from "./components/forecast/Forecast";
//
//every react comp need to be define
const App = (): JSX.Element => {
  const { term, option, forecast, onChangeInput, optionSelect, onSubmit } =
    useForecast();
  return (
    <main className="flex justify-center items-center bg-gradient-to-br from-sky-400 via-rose-400 to-lime-400 h-[100vh] w-full">
      {forecast ? (
        <Forecast data={forecast} />
      ) : (
        <SearchSection
          term={term}
          option={option}
          onChangeInput={onChangeInput}
          optionSelect={optionSelect}
          onSubmit={onSubmit}
        />
      )}
    </main>
  );
};

export default App;

// https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
// f281ad23c454d69d7b050e565c983d52
