import Navbar from "@/components/Navbar";

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

interface Wind {
  speed: number;
  deg: number;
  gust?: number;
}

interface WeatherData {
  dt: number;
  main: Main;
  weather: Weather[];
  clouds: { all: number };
  wind: Wind;
  visibility: number;
  pop: number;
  rain?: { "3h": number };
  sys: { pod: "d" | "n" };
  dt_txt: string;
}

interface City {
  id: number;
  name: string;
  coord: { lat: number; lon: number };
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

type WeatherResponse = {
  cod: number;
  message: number;
  cnt: number;
  list: WeatherData[];
  city: City;
};

export default function Home() {
  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
      <Navbar />
    </div>
  );
}
