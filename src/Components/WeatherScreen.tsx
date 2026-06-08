import { useEffect, useState } from "react";
import type { WeatherInfo } from "./Utils/WeatherDataType";
import ForecastToday from "./ForecastToday";
import ForecastDays from "./ForecastDays";
import { useLocation } from "./Utils/GetLocation";
import ErrorWeather from "./ErrorWeather";
import WeatherSourceInfoDetails from "./WeatherSourceInfoDetails";
import windIcon from "../assets/Images/wind-icon.png";
import arrowIcon from "../assets/Images/right-up-icon.png";
import speedIcon from "../assets/Images/rush-icon.png";
import cloudyWeather from "../assets/Images/weather-icon.gif";
import sunIcon from "../assets/Images/sun-icon.gif";
import ErrorWeatherLocation from "./ErrorWeatherLocation";
import LoadingWeather from "./LoadingWeather";
import type { WeatherInfoDaysAll } from "./Utils/WeatherTypeDaysAll";

function addDays(date: Date, days: number) {
  const resultDate = new Date(date);
  resultDate.setDate(resultDate.getDate() + days);
  return resultDate;
}

export default function WeatherScreen() {
  const [data, setData] = useState<WeatherInfo | null>();
  const [error, setError] = useState(false);
  const [weatherIcons, setWeatherIcons] = useState<string[]>([]);
  const [datesDay, setDatesDay] = useState<Date[]>([]);
  const [dateNow, setDateNow] = useState<Date>(new Date());
  const { location, errorLocation } = useLocation();
  const [daysAll, setDaysAll] = useState<WeatherInfoDaysAll[][]>(
    Array.from({ length: 5 }, () => []),
  );

  useEffect(() => {
    const getData = async () => {
      try {
        if (!location) {
          return;
        }
        const { lat, lon } = location;

        fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=3750d72083f6b2020a9a722f41248c15`,
        )
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log(data);
            setData(data);
            const icons = [];
            const dates: Date[] = [];
            let date: Date;
            for (let i = 0; i < 6; i++) {
              icons.push(data?.list[i]?.weather[0]?.icon);
              date = new Date(data?.list[i]?.dt_txt);
              dates.push(date);
            }

            setWeatherIcons(icons);
            setDatesDay(dates);
          });
      } catch {
        setError(true);
      }
    };

    getData();
  }, [location]);

  useEffect(() => {
    const daysSetAll = (data: WeatherInfo | null | undefined) => {
      if (!data?.list?.length) {
        return;
      }
      const date1 = new Date(data?.list[0]?.dt_txt);
      const date2: Date = addDays(date1, 1);
      const date3: Date = addDays(date1, 2);
      const date4: Date = addDays(date1, 3);
      const date5: Date = addDays(date1, 4);

      const days: WeatherInfoDaysAll[][] = [[], [], [], [], []];
      for (let i = 0; i < data?.list.length; i++) {
        const date = new Date(data?.list[i].dt_txt);
        const dateNumber = date.getDate();

        if (dateNumber === date1.getDate()) {
          days[0].push(data?.list[i]);
        } else if (dateNumber === date2.getDate()) {
          {
            days[1].push(data?.list[i]);
          }
        } else if (dateNumber === date3.getDate()) {
          days[2].push(data?.list[i]);
        } else if (dateNumber === date4.getDate()) {
          days[3].push(data?.list[i]);
        } else if (dateNumber === date5.getDate()) {
          days[4].push(data?.list[i]);
        }
      }
      setDaysAll(days);
    };
    daysSetAll(data);
  }, [data]);

  useEffect(() => {
    setInterval(() => {
      setDateNow(new Date());
    }, 1000);
  }, [dateNow]);

  useEffect(() => {
    console.log(daysAll);
  }, [setDaysAll]);
  if (errorLocation)
    return <ErrorWeatherLocation errorLocation={errorLocation} />;
  if (error) return <ErrorWeather />;
  if (!location || !data) return <LoadingWeather />;

  return (
    <>
      <div className=" flex flex-col justify-start items-center pt-5 ">
        <>
          <div className="flex justify-start items-center text-white text-2xl rounded-tl-2xl gap-2 animate-fade-in-translate">
            <div className="">
              {data?.city.name} / {data?.city.country}
            </div>
            <div className="opacity-50">
              {dateNow.toLocaleTimeString("en-US", {
                timeZone: "Asia/Beirut",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true, // true = AM
              })}
            </div>
            <div className="opacity-50">
              {dateNow.toLocaleDateString("en-Us", { weekday: "long" })}
            </div>
          </div>
          <div className="h-1/2  flex justify-center items-center flex-col text-white rounded-tr-2xl rounded-tl-2xl animate-fade-in-translate">
            <div className="w-40 h-40 ">
              <img
                src={`https://openweathermap.org/img/wn/${weatherIcons[0]}@2x.png`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-2xl capitalize">
              {data?.list[0].weather[0].description}
            </div>
            <div className="text-2xl">
              {Math.floor(Number(data?.list[0].main.temp))} °
            </div>
            <div className="opacity-70">
              Feels Like:{data?.list[0].main.feels_like} °
            </div>
            <div className="flex gap-4 opacity-70">
              <div>min: {data?.list[0].main.temp_min} °</div>
              <div>|</div>
              <div>max: {data?.list[0].main.temp_max} °</div>
            </div>
            <div className=" flex flex-col justify-center items-center w-fit">
              <div className=" flex hover:scale-105 gap-2 justify-center items-center peer cursor-pointer">
                <img src={windIcon} className="w-5 h-5 object-cover" />
                Wind
              </div>
              <div className="opacity-0 max-sm:opacity-100 flex gap-2 peer-hover:opacity-70 transition-all cursor-default">
                <div className="flex justify-center items-center gap-0.5">
                  <img src={arrowIcon} className="w-5 h-5 object-cover" />
                  Degree:{data?.list[0].wind.deg}
                </div>
                <div className="flex justify-center items-center gap-0.5">
                  <img src={speedIcon} className="w-5 h-5 object-cover" />
                  Speed:{data?.list[0].wind.speed} Km/h
                </div>
              </div>
            </div>
            <div className="text-white  flex justify-center items-center gap-2 w-full max-sm:mt-5">
              <img
                src={cloudyWeather}
                className="w-15 h-15 max-sm:w-8 max-sm:h-8 object-cover"
              />
              <div className="max-sm:text-2xl max-md:text-3xl text-4xl">
                Forecast For the Day:
              </div>
            </div>
          </div>

          <ForecastToday
            data={data}
            datesDay={datesDay}
            weatherIcons={weatherIcons}
            daysAll={daysAll}
          />
          <div className="text-white max-sm:text-2xl max-md:text-3xl text-4xl mt-10 flex justify-center items-center animate-fade-in-translate">
            <img
              src={sunIcon}
              alt=""
              className="w-15 h-15 max-sm:w-8 max-sm:h-8 object-cover"
            />
            Forecast For Next Days:
          </div>
          <ForecastDays
            data={data}
            datesDay={datesDay}
            weatherIcons={weatherIcons}
            setWeatherIcons={setWeatherIcons}
            daysAll={daysAll}
          />
        </>
        <WeatherSourceInfoDetails />
      </div>
    </>
  );
}
