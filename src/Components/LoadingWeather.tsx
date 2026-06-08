import loadingIcon from "../assets/Images/loading-circle-icon.gif";
export default function LoadingWeather() {
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div>
        <img src={loadingIcon} alt="" className="w-30 h-30" />
      </div>
      <div className="text-3xl text-white">
        Loading Your Location....
      </div>
    </div>
  );
}
