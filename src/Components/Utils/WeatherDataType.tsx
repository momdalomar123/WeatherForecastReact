export type WeatherInfo = {
  name: string;
  city: {
    id: number;
    name: string;
    country: string;
    sunrise: number;
    sunset: number;
    timezone: number;
  };
  list: [
    {
      dt: number;
      dt_txt: string;

      main: {
        temp: number;
        feels_like: number;
        pressure: number;
        humidity: number;
        sea_level: number;
        temp_min:number;
        temp_max:number;
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
    },
  ];
};