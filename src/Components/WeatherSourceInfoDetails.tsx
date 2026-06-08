import githubIcon from "../assets/Images/github-icon.png";
export default function WeatherSourceInfoDetails() {
  return (
    <>
      <div className="flex flex-col pt-30 max-sm:pt-20 pb-5  gap-2 animate-fade-in-translate ">
        <div className="text-white flex gap-2  ">
          <div className="opacity-70">Weather Source:</div>
          <a href=" https://openweathermap.org/" className="relative">
            <span
              className="font-bold
            after:transition-all after:ease-in-out after:duration-300 after:content-[''] after:bg-gray-300 after:block after:w-1 after:h-0.5 after:absolute after:bottom-0
          after:left-0
          after:opacity-0
          hover:after:opacity-100 hover:after:w-full"
            >
              OpenWeather
            </span>
          </a>
        </div>
        <div className="text-white opacity-70 flex justify-center gap-4 mr-6">
          My Github:
          <a href="https://github.com/momdalomar123" target="_blank">
            <img
              src={githubIcon}
              alt=""
              className="w-6 h-6 transition-all hover:opacity-70"
            />
          </a>
        </div>
      </div>
    </>
  );
}
