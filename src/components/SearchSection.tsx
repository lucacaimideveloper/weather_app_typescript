import { ChangeEvent } from "react";
import { optionType } from "./Icons/types";

type Props = {
  term: string;
  option: [];
  onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
  optionSelect: (item: optionType) => void;
  onSubmit: () => void;
};

//
//every react comp need to be define
const Search = ({
  term,
  option,
  onChangeInput,
  optionSelect,
  onSubmit,
}: Props): JSX.Element => {
  return (
    <main className="flex justify-center items-center bg-gradient-to-br from-sky-400 via-rose-400 to-lime-400 h-[100vh] w-full">
      <section className="bg-white w-full md:max-w-[500px] p-4 flex flex-col text-center items-center justify-center md:px-10 lg:p:24 h-full lg:h=[500px] bg-opacity-20 background-blur-lg drop-shadow-lg rounded text-zinc-700">
        <h1 className="text-4xl font-thin">
          Weather <span className="font-black">Forecast</span>
        </h1>
        <p className="text-sm mt-2">
          Enter below a place where you want to know the weather and selct an
          option from the dropdown
        </p>
        <div className="flex mt-10 md:mt-4 relative">
          <input
            type="text"
            value={term}
            className="px-2 py-1 border-2 border-white"
            onChange={onChangeInput}
          />

          <ul className="absolute top-9 bg-white ml-1 rounded-b-md">
            {option.map((item: optionType, index: number) => {
              return (
                <li key={item.name + "-" + index}>
                  <button
                    className="text-left text-sm w-full hover:bg-zinc-700 hover:text-white px-2 py-1 cursor-pointer"
                    onClick={() => optionSelect(item)}>
                    {item.name}, {item.country}
                  </button>
                </li>
              );
            })}
          </ul>

          <button
            onClick={onSubmit}
            className="rounded-r-md border-2 border-zinc-100 hover:border-zinc-500 hover:text-zinc-500 text-zinc-100 px-2 py-1 cursor-pointer">
            Search
          </button>
        </div>
      </section>
    </main>
  );
};

export default Search;

// https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
// f281ad23c454d69d7b050e565c983d52
