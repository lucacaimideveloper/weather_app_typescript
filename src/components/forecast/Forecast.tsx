import {
  getHumidityValue,
  getPop,
  getSunTime,
  getVisibilityValue,
  // getBackgroundImage,
} from "../../helpers";
import Sunrise from "../Icons/Sunrise";
import Sunset from "../Icons/Sunset";
import { forecastType } from "../Icons/types";
import Tile from "../tile/Tile";
import { getWindDirection } from "../../helpers";
type Props = {
  data: forecastType;
};

const Degree = ({ temp }: { temp: number }): JSX.Element => (
  <span>
    {Math.round(temp) - 271}
    <sup>0</sup>
  </span>
);

const Forecast = ({ data }: Props): JSX.Element => {
  const today = data.list[0];
  return (
    <>
      <div
        className="bg-cover bg-center h-screen"
        // style={{
        //   backgroundImage: getBackgroundImage(today.weather[0].description),
        // }}
      >
        <div className="w-full md:max-w-[500px] py-4 md:py-4 md:px-10 lg:px-24 h-full lg:h-auto bg-white bg-opacity-20 backdrop-blur-ls rounded drop-shadow-lg">
          <div className="mx-auto w-[300px]">
            <section className="text-center">
              <h2 className="text-2xl font-black">
                {data.name}, <span className="font-thin">{data.country}</span>
              </h2>
              <h1 className="text-4xl font-extrabold">
                <Degree temp={today.main.temp} />
              </h1>
              <p className="text-sm">
                {today.weather[0].main}・{today.weather[0].description}
              </p>
              <p className="text-sm">
                H: <Degree temp={Math.ceil(today.main.temp_max)} />
                L: <Degree temp={Math.floor(today.main.temp_min)} />
              </p>
            </section>
            <section className="flex overflow-x-scroll mt-4 pb-2 mb-5">
              {data.list.map((item, i) => {
                return (
                  <div
                    className="inline-block text-center w-[50px] flex-shrink-0"
                    key={i}>
                    <p className="text-sm ">
                      {i === 0 ? "Now" : new Date(item.dt * 1000).getHours()}
                    </p>
                    <img
                      src={`https://openweathermap.org/img/wn/10d@2x.png`}
                      alt={`weather-icon-${item.weather[0].description}`}
                    />
                    <Degree temp={item.main.temp} />
                  </div>
                );
              })}
            </section>
            <section className="flex  justify-between text-zinc-700 ">
              <div className="w-[130px] text-xs font-bold   flex  flex-col items-center bg-white/20 backdrop-blur-lg rounded drop-shadow-lg py-4 mb-5">
                <Sunrise />
                <span className="mt-2">{getSunTime(data.sunrise)}</span>
              </div>

              <div className="w-[130px] text-xs font-bold flex flex-col items-center bg-white/20 backdrop-blur-lg rounded drop-shadow-lg py-4 mb-5">
                <Sunset />
                <span className="mt-2">{getSunTime(data.sunset)}</span>
              </div>
            </section>

            <section className="flex flex-wrap justify-between text-zinc-700 ">
              <Tile
                icon="wind"
                title="Wind"
                info={`${Math.round(today.wind.speed)}・km/h`}
                description={`${getWindDirection(
                  Math.round(today.wind.deg)
                )} Gust ${today.wind.gust.toFixed(1)}・km/h`}
              />
              <Tile
                icon="feels"
                title="Feels Like"
                info={<Degree temp={Math.round(today.main.feels_like)} />}
                description={`Feels ${
                  Math.round(today.main.feels_like) <
                  Math.round(today.main.temp)
                    ? "colder"
                    : "warmer"
                }`}
              />
              <Tile
                icon="humidity"
                title="Humidity"
                info={`today ・${today.main.humidity} %`}
                description={getHumidityValue(today.main.humidity)}
              />
              <Tile
                icon="pop"
                title="Pop"
                info={`${Math.round(today.pop * 100)} %`}
                description={`${getPop(today.pop)}, clouds at ${
                  today.clouds.all
                }%`}
              />
              <Tile
                icon="pressure"
                title="Pressure"
                info={`${today.main.pressure} hPa`}
                description={`${
                  Math.round(today.main.pressure) < 1013 ? "Lower" : "Higher"
                }`}
              />
              <Tile
                icon="visibility"
                title="Visibility"
                info={`${(today.visibility / 1000).toFixed()} km`}
                description={`${getVisibilityValue(today.visibility)}`}
              />
              <Tile
                icon="wind"
                title="Wind"
                info={`${Math.round(today.wind.speed)}`}
                description={`${getWindDirection(
                  Math.round(today.wind.deg)
                )}, gust ${today.wind.gust.toFixed(1)}・km/h}`}
              />
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Forecast;
