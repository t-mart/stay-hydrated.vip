import { useEffect, useState, useRef } from "react";

const TIMER_DURATION_MS = 15 * 60 * 1000;

export default function Timer() {
  const [millisecondsLeft, setMillisecondsLeft] = useState<
    number | undefined
  >();
  const audioRef = useRef<HTMLAudioElement>(null);
  const isRunning = millisecondsLeft !== undefined;

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    const interval = setInterval(() => {
      setMillisecondsLeft((prev) => {
        // This check is technically not needed due to the `if (!isRunning)`
        // check above, but it satisfies TypeScript.
        if (prev === undefined) return;

        if (prev <= 1000) {
          playNotification();
          return TIMER_DURATION_MS; // Reset the loop
        }
        return prev - 1000;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  function playNotification() {
    audioRef.current?.play();
  }

  function handleStartTimer() {
    setMillisecondsLeft(TIMER_DURATION_MS);
  }

  return (
    <div
      className={`h-50 flex flex-col items-center justify-center rounded-2xl p-4 ${
        isRunning ? "border-6 bg-background-light" : ""
      } border-primary`}
    >
      {isRunning ? (
        <div className="text-8xl font-mono">
          {formatDuration(millisecondsLeft)}
        </div>
      ) : (
        <>
          <p className="mb-8 text-muted">
            Press the button, and every 15 minutes, a notification will sound,
            reminding you to drink some water.{" "}
            <button
              type="button"
              onClick={playNotification}
              className="link-button cursor-pointer"
            >
              Test the notification
            </button>
            .
          </p>
          <button
            type="button"
            onClick={handleStartTimer}
            className="px-6 py-2 text-4xl bg-primary text-text rounded-xl font-bold cursor-pointer hover:bg-primary-hover"
          >
            Start
          </button>
        </>
      )}
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio ref={audioRef} src="/notification-sound.mp3" />
    </div>
  );
}

function formatDuration(milliseconds: number): string {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  // Format as MM:SS,
  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;
}
