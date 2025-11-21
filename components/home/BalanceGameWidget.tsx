"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";

interface BalanceGame {
  id: string;
  question: string;
  optionA: string;
  optionB: string;
}

const balanceGames: BalanceGame[] = [
  {
    id: "1",
    question: "주말 데이트 어디가?",
    optionA: "헤이리 예술마을",
    optionB: "운정 호수공원",
  },
  {
    id: "2",
    question: "파주 맛집 추천",
    optionA: "문산 맛집 골목",
    optionB: "출판도시 카페거리",
  },
  {
    id: "3",
    question: "주말 나들이",
    optionA: "DMZ 관광",
    optionB: "헤이리 마을 산책",
  },
];

export default function BalanceGameWidget() {
  const [selectedGame, setSelectedGame] = useState(0);
  const [selectedOption, setSelectedOption] = useState<"A" | "B" | null>(null);
  const [votes, setVotes] = useState<{ A: number; B: number }>({ A: 45, B: 55 });

  const currentGame = balanceGames[selectedGame];

  const handleVote = (option: "A" | "B") => {
    if (selectedOption) return; // 이미 투표한 경우

    setSelectedOption(option);
    
    // 투표 애니메이션을 위한 랜덤 퍼센트 생성
    const newVotes = {
      A: option === "A" ? Math.floor(Math.random() * 30) + 50 : Math.floor(Math.random() * 30) + 20,
      B: option === "A" ? Math.floor(Math.random() * 30) + 20 : Math.floor(Math.random() * 30) + 50,
    };
    
    // 애니메이션 효과를 위해 점진적으로 업데이트
    const steps = 20;
    const stepA = (newVotes.A - votes.A) / steps;
    const stepB = (newVotes.B - votes.B) / steps;
    
    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      setVotes({
        A: Math.round(votes.A + stepA * currentStep),
        B: Math.round(votes.B + stepB * currentStep),
      });
      
      if (currentStep >= steps) {
        clearInterval(interval);
        setVotes(newVotes);
      }
    }, 30);
  };

  const handleNextGame = () => {
    setSelectedGame((prev) => (prev + 1) % balanceGames.length);
    setSelectedOption(null);
    setVotes({ A: 45, B: 55 });
  };

  return (
    <Card>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">🔥 오늘의 밸런스 게임</h3>
          <button
            onClick={handleNextGame}
            className="text-xs text-gray-500 hover:text-paju-blue transition-colors"
          >
            다음 게임 →
          </button>
        </div>

        <div className="mb-4">
          <p className="text-sm font-semibold text-gray-700 mb-4">
            {currentGame.question}
          </p>

          {/* 투표 버튼 */}
          <div className="space-y-3">
            <button
              onClick={() => handleVote("A")}
              disabled={!!selectedOption}
              className={`w-full p-4 rounded-lg font-semibold text-white transition-all ${
                selectedOption === "A"
                  ? "bg-paju-blue"
                  : selectedOption === "B"
                  ? "bg-gray-300"
                  : "bg-paju-blue hover:bg-paju-blue-dark"
              } ${selectedOption ? "cursor-not-allowed" : "hover:shadow-md"}`}
            >
              {currentGame.optionA}
            </button>

            <div className="text-center text-gray-500 text-sm font-medium">VS</div>

            <button
              onClick={() => handleVote("B")}
              disabled={!!selectedOption}
              className={`w-full p-4 rounded-lg font-semibold text-white transition-all ${
                selectedOption === "B"
                  ? "bg-paju-green"
                  : selectedOption === "A"
                  ? "bg-gray-300"
                  : "bg-paju-green hover:bg-paju-green-dark"
              } ${selectedOption ? "cursor-not-allowed" : "hover:shadow-md"}`}
            >
              {currentGame.optionB}
            </button>
          </div>
        </div>

        {/* 투표 결과 */}
        {selectedOption && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="space-y-2">
              <div>
                <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                  <span>{currentGame.optionA}</span>
                  <span className="font-semibold">{votes.A}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-paju-blue h-2 rounded-full transition-all duration-500"
                    style={{ width: `${votes.A}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                  <span>{currentGame.optionB}</span>
                  <span className="font-semibold">{votes.B}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-paju-green h-2 rounded-full transition-all duration-500"
                    style={{ width: `${votes.B}%` }}
                  />
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-3 text-center">
              {selectedOption === "A" ? currentGame.optionA : currentGame.optionB}에 투표하셨습니다!
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}

