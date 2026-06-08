export type WeatherInfoDaysAll = {

  
      dt: number;
      dt_txt: string;

      main: {
        temp: number;
        feels_like: number;
        pressure: number;
        humidity: number;
        sea_level: number;
      };
      weather: [
        {
          id: number;
          main: string;
          icon: string;
          description: string;
        },
      ];
      sys: {
        country: string;
      };
      wind: {
        deg: number;
        gust: number;
        speed: number;
      };
    
  
};