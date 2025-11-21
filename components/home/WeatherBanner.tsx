"use client";

import { useState, useEffect } from "react";
import { SunIcon, CloudIcon } from "@heroicons/react/24/outline";

interface WeatherData {
  temperature: number;
  condition: string;
  code: number;
}

export default function WeatherBanner() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [airQuality, setAirQuality] = useState<"좋음" | "보통" | "나쁨">("좋음");

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
        temperature: 15,
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

  const getAirQualityEmoji = (quality: string) => {
    if (quality === "좋음") return "😊";
    if (quality === "보통") return "😐";
    return "😷";
  };

  if (isLoading) {
    return (
      <div className="bg-gradient-to-r from-[#0D4FFF] to-[#007AFF] h-16">
        <div className="max-w-3xl mx-auto px-4 h-full flex items-center">
          <div className="animate-pulse w-full h-4 bg-white/20 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-[#0D4FFF] to-[#007AFF] h-16">
      <div className="max-w-3xl mx-auto px-4 h-full flex items-center justify-between">
        {/* 좌측: 위치 + 날씨 */}
        <div className="flex items-center space-x-3 text-white text-sm">
          <span>📍 파주</span>
          {weather && (
            <>
              <span className="text-lg font-semibold">
                🌡️ {weather.temperature}°C {getWeatherEmoji(weather.code)}
              </span>
            </>
          )}
        </div>

        {/* 우측: 미세먼지 */}
        <div className="text-white text-xs">
          미세먼지 {airQuality} {getAirQualityEmoji(airQuality)}
        </div>
      </div>
    </div>
  );
}
