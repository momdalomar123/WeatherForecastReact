import type { WeatherInfo } from "./Utils/WeatherDataType";
import type { WeatherInfoDaysAll } from "./Utils/WeatherTypeDaysAll";
type WeatherInfoData = {
  data: WeatherInfo | null;
  datesDay: Date[];
  weatherIcons: string[];
  daysAll:WeatherInfoDaysAll[][]
};
export default function ForecastToday({
  datesDay,
  daysAll
}: WeatherInfoData) {
  console.log(daysAll[0].length)
  return (
    <div className={`grid grid-cols-${daysAll[0].length}  h-1/2  gap-1 rounded-br-2xl rounded-bl-2xl mt-10`}>
      {[...Array(daysAll[0].length)].map((_, i) => (
        <div
          key={i}
          className={`h-50 w-50 max-sm:w-30 max-md:w-40
                   rounded-2xl flex flex-col gap-2 justify-center items-center  text-white cursor-pointer transition-all hover:border-2 hover:border-white hover:bg-linear-to-t from-purple-400 to-blue-500 hover:shadow-[10px_5px_10px_0_rgba(100,40,0,0.5)] animate-fade-in-translate`}
        >
          <div>
            <img
              src={`https://openweathermap.org/img/wn/${daysAll[0][i]?.weather[0]?.icon}@2x.png`}
              className="max-sm:w-20 max-md:w-25"
            />
          </div>
          <div className="capitalize">
            {daysAll[0][i].weather[0].description}
          </div>
          <div className="">
            {datesDay[i + 1]?.toLocaleTimeString("en-US", {
              timeZone: "Asia/Beirut",
              hour: "2-digit",
              hour12: true, // true = AM/PM, false = 24h
            })}
          </div>
          <div>{Math.floor(Number(daysAll[0][i].main.temp))} C°</div>
          <div></div>
        </div>
      ))}
    </div>
  );
}
