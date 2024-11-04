// PomodoroTimer.js
"use client";
import { useTranslations } from "next-intl";
import { useState, useEffect, useRef } from "react";

export default function PomodoroTimer() {
  const t = useTranslations("pomodoro-timer-tool");

  const [workDuration, setWorkDuration] = useState(25); // Duração do trabalho em minutos
  const [breakDuration, setBreakDuration] = useState(5); // Duração da pausa em minutos
  const [timeLeft, setTimeLeft] = useState(workDuration * 60); // Tempo restante em segundos
  const [isActive, setIsActive] = useState(false);
  const [isWorking, setIsWorking] = useState(true); // Alterna entre trabalho e pausa
  const [notification, setNotification] = useState(""); // Notificação visual
  const audioRef = useRef(null); // Referência ao áudio para tocar o som

  useEffect(() => {
    let timer: any;
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      playSound(); // Toca o som ao final
      setNotification(isWorking ? t("timeUpBreak") : t("timeUpWork")); // Atualiza a notificação visual
      // Alterna entre trabalho e pausa
      setIsWorking((prev) => !prev);
      setTimeLeft(isWorking ? breakDuration * 60 : workDuration * 60);
    }
    return () => clearInterval(timer);
  }, [isActive, timeLeft, isWorking, workDuration, breakDuration, t]);

  const toggleTimer = () => {
    setIsActive((prev) => !prev);
    setNotification(""); // Limpa a notificação ao iniciar/pausar
  };

  const resetTimer = () => {
    setTimeLeft(workDuration * 60);
    setIsActive(false);
    setIsWorking(true);
    setNotification(""); // Limpa a notificação ao reiniciar
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };

  const playSound = () => {
    if (audioRef.current) {
      // @ts-ignore
      audioRef.current.play();
    }
  };

  // Calcula o progresso do círculo
  const progress = isWorking
    ? ((workDuration * 60 - timeLeft) / (workDuration * 60)) * 100
    : ((breakDuration * 60 - timeLeft) / (breakDuration * 60)) * 100;

  return (
    <div className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8 min-h-[calc(100dvh-80px)]">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />
      <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />

      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
          {t("title")}
        </h2>
        <p className="mt-2 text-lg text-gray-600">{t("description")}</p>
      </div>

      <div className="mx-auto mt-10 max-w-md text-center">
        <div className="flex flex-col items-center justify-center">
          <svg className="w-40 h-40">
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="gray"
              strokeWidth="10"
              fill="none"
            />
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke={isWorking ? "rgb(79, 70, 220)" : "rgb(255, 70, 220)"} // Cor azul para trabalho e verde para pausa
              strokeWidth="10"
              fill="none"
              strokeDasharray="440"
              strokeDashoffset={440 - (440 * progress) / 100}
              style={{ transition: "stroke-dashoffset 1s linear" }}
            />
          </svg>
          <div className=" inset-0 flex  text-4xl font-mono text-indigo-600">
            {formatTime(timeLeft)}
          </div>
        </div>

        <div className="mt-4 text-sm text-indigo-600">
          {notification} {/* Exibe a notificação visual */}
        </div>

        <div className="mt-6 flex justify-center space-x-4">
          <button
            onClick={toggleTimer}
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {isActive ? t("pauseButton") : t("startButton")}
          </button>
          <button
            onClick={resetTimer}
            className="rounded-md bg-gray-400 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
          >
            {t("resetButton")}
          </button>
        </div>

        {/* Campos para ajustar duração de trabalho e pausa */}
        <div className="mt-8 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t("workDurationLabel")}
            </label>
            <input
              type="number"
              min="1"
              value={workDuration}
              onChange={(e) => setWorkDuration(parseInt(e.target.value))}
              className="mt-1 p-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t("breakDurationLabel")}
            </label>
            <input
              type="number"
              min="1"
              value={breakDuration}
              onChange={(e) => setBreakDuration(parseInt(e.target.value))}
              className="mt-1 p-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>
      </div>

      {/* Elemento de áudio oculto para o som de notificação */}
      <audio ref={audioRef} src="/beep-sound.mp3" />
    </div>
  );
}
