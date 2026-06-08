import locationIcon from '../assets/Images/location-icon.png'

type ErrorLocation={
  errorLocation:string
}
function reloadPage() {
  window.location.reload();
}
export default function ErrorWeatherLocation({errorLocation}:ErrorLocation)
{
    return(
         
        <div className="w-screen h-screen flex justify-center items-center bg-white">
        <div className="flex flex-col">
          <div className="  w-100 h-50 flex justify-center items-center gap-2">
            <div>
              <img
                src={locationIcon}
                className="w-50 h-40 object-cover max-sm:w-30 max-sm:h-30"
              />
            </div>
            <div className="flex flex-col">
              <div className="text-4xl max-sm:text-2xl max-md:text-3xl max-sm:w-2/3">
                {errorLocation}
              </div>
              <div className="opacity-60">
                Check Your Location Settings and Try Again.
              </div>
            </div>
          </div>
          <div className="">
            <button
              className="cursor-pointer w-full bg-amber-400 pt-2 pb-2 rounded-2xl
              transition-all hover:bg-amber-300 hover:text-white hover:scale-105"
              onClick={reloadPage}
            >
              Refresh Page
            </button>
          </div>
        </div>
      </div>
    );
}