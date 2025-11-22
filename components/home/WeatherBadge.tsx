"use client";

import { useState, useEffect } from "react";

interface WeatherData {
  temperature: number;
  condition: string;
  code: number;
}

export default function WeatherBadge() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadWeather();
  }, []);

  const loadWeather = async () => {
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=37.76&longitude=126.78&current=temperature_2m,weather_code&timezone=Asia%2FSeoul`
      );
      const data = await response.json();

      if (data.current) {
        const code = data.current.weather_code;
        let condition = "맑음";
        
        if (code === 0) condition = "맑음";
        else if (code <= 3) condition = "구름 조금";
        else if (code <= 48) condition = "흐림";
        else if (code <= 67) condition = "비";
        else if (code <= 77) condition = "눈";
        else if (code <= 82) condition = "소나기";
        else if (code <= 86) condition = "눈";
        else condition = "천둥번개";

        setWeather({
          temperature: Math.round(data.current.temperature_2m),
          condition,
          code,
        });
      }
    } catch (error) {
      console.error("Failed to load weather:", error);
      setWeather({
        temperature: 18,
        condition: "맑음",
        code: 0,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getWeatherEmoji = (code: number) => {
    if (code === 0) return "☀️";
    if (code <= 3) return "⛅";
    if (code <= 48) return "☁️";
    if (code <= 67) return "🌧️";
    if (code <= 77 || (code >= 85 && code <= 86)) return "❄️";
    return "🌦️";
  };

  if (isLoading) {
    return (
      <div className="px-3 py-1.5 bg-gray-50 rounded-full">
        <div className="w-12 h-4 bg-gray-200 rounded animate-pulse"></div>
      </div>
    );
  }

  if (!weather) return null;

  // 미세먼지 더미 데이터
  const dustLevel = 32;
  const dustStatus = dustLevel <= 30 ? "좋음" : dustLevel <= 80 ? "보통" : "나쁨";
  const dustColor = dustLevel <= 30 ? "text-green-600" : dustLevel <= 80 ? "text-yellow-600" : "text-red-600";

  return (
    <div className="px-3 py-1.5 bg-gray-50 rounded-full text-xs text-gray-600 flex flex-col items-center space-y-0.5">
      <div className="flex items-center space-x-1">
        <span>{getWeatherEmoji(weather.code)}</span>
        <span className="font-medium">{weather.temperature}°C</span>
      </div>
      <div className={`text-xs ${dustColor} font-medium`}>
        미세먼지: {dustStatus}({dustLevel}㎍/m³)
      </div>
    </div>
  );
}

