"use client";

import { useState, useEffect } from "react";
import {
  SunIcon,
  CloudIcon,
} from "@heroicons/react/24/outline";
import Card from "@/components/ui/Card";

interface WeatherData {
  temperature: number;
  condition: string;
  code: number;
}

export default function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [airQuality, setAirQuality] = useState<"좋음" | "보통" | "나쁨">("좋음");

  useEffect(() => {
    loadWeather();
  }, []);

  const loadWeather = async () => {
    try {
      // Open-Meteo API 호출 (파주시청 좌표: 37.76, 126.78)
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=37.76&longitude=126.78&current=temperature_2m,weather_code&timezone=Asia%2FSeoul`
      );
      const data = await response.json();

      if (data.current) {
        const code = data.current.weather_code;
        let condition = "맑음";
        
        // WMO Weather Code에 따른 날씨 상태
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
      // 기본값 설정
      setWeather({
        temperature: 15,
        condition: "맑음",
        code: 0,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getWeatherIcon = (code: number) => {
    if (code === 0) return <SunIcon className="w-12 h-12" />;
    if (code <= 3) return <CloudIcon className="w-12 h-12" />;
    if (code <= 48) return <CloudIcon className="w-12 h-12" />;
    // 비나 눈의 경우 이모지 사용
    if (code <= 67) return <span className="text-4xl">🌧️</span>;
    if (code <= 77 || (code >= 85 && code <= 86)) return <span className="text-4xl">❄️</span>;
    return <CloudIcon className="w-12 h-12" />;
  };

  const getAirQualityEmoji = (quality: string) => {
    if (quality === "좋음") return "😊";
    if (quality === "보통") return "😐";
    return "😷";
  };

  if (isLoading) {
    return (
      <Card className="bg-gradient-to-br from-blue-400 to-blue-500 text-white">
        <div className="p-6">
          <div className="animate-pulse">
            <div className="h-8 bg-white/20 rounded mb-4"></div>
            <div className="h-12 bg-white/20 rounded"></div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-blue-400 to-blue-500 text-white p-0 overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-sm font-medium text-white/90 mb-1">파주 날씨</h3>
            <div className="text-4xl font-bold">{weather?.temperature}°</div>
          </div>
          <div className="text-white/90">
            {weather && getWeatherIcon(weather.code)}
          </div>
        </div>
        <div className="text-sm text-white/90 mb-2">{weather?.condition}</div>
        <div className="text-xs text-white/80">
          미세먼지: {airQuality} {getAirQualityEmoji(airQuality)}
        </div>
      </div>
    </Card>
  );
}

