import { useEffect, useState } from "react";
import type { WeatherInfo } from "./Utils/WeatherDataType";
import type { WeatherInfoDaysAll } from "./Utils/WeatherTypeDaysAll";
type WeatherInfoData = {
  data: WeatherInfo | null;
  datesDay: Date[];
  weatherIcons: string[];
  setWeatherIcons: (value: string[]) => void;
  daysAll: WeatherInfoDaysAll[][];
};
export default function ForecastDays({
  data,
  weatherIcons,
  setWeatherIcons,
  daysAll,
}: WeatherInfoData) {
  const [dateDays, setDateDays] = useState<Date[]>([]);
  const [averageTemp, setAverageTemp] = useState<number[]>([]);

 
  useEffect(() => {
    if (!data?.list) return;
    const getData = () => {
      const icons: string[] = [...weatherIcons];
      const dates: Date[] = [];
      let date: Date;
      for (let i = 1; i < 5; i++) {
        icons.push(daysAll[i][0]?.weather[0]?.icon);
        date = new Date(daysAll[i][0]?.dt_txt);
        dates.push(date);
      }
      setDateDays(dates);
      setWeatherIcons(icons);
      
    };
    getData();
  }, [daysAll,data?.list]);

  useEffect(()=>{
    const getAverageTemp=()=>{
       const arrayAverageTemp=[]
    for (let i = 1; i < daysAll.length; i++) {
      let sum = 0;
      let average=0;
      let amount = 0;
      for (let j = 0; j < daysAll[i].length; j++) {
        sum += daysAll[i][j].main.temp;
        amount += 1;
        console.log(average)
      }
      average = sum / amount;
      arrayAverageTemp.push(average)
    }
    setAverageTemp(arrayAverageTemp)
    }
    getAverageTemp()
  },[daysAll])

  return (
    <div className="grid grid-cols-4 h-1/2  gap-1 rounded-br-2xl rounded-bl-2xl mt-10">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className={`h-50 w-50 max-sm:w-30 max-md:w-40
                   rounded-2xl flex flex-col gap-1
                   pt-2 pb-5 justify-center items-center  text-white cursor-pointer transition-all hover:border-2 hover:border-white hover:bg-linear-to-t from-purple-400 to-blue-500 hover:shadow-[10px_5px_10px_0_rgba(100,40,0,0.5)] animate-fade-in-translate`}
        >
          <div className="flex flex-col justify-center items-center">
            <div className="mt-5">
              {dateDays[i]?.toLocaleDateString("en-US", {
                timeZone: "Asia/Beirut",
                weekday: "long",
              })}
            </div>
            <img
              src={`https://openweathermap.org/img/wn/${daysAll[i + 1][4]?.weather[0].icon}@2x.png`}
              className="max-sm:w-20 max-md:w-25"
            />
          </div>
          <div className="capitalize">
            {daysAll[i + 1][4]?.weather[0]?.description}
          </div>

          <div>{Math.floor(averageTemp[i])} C°</div>
          <div></div>
        </div>
      ))}
    </div>
  );
}
