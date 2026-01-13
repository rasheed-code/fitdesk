import { Action, ActionPanel, Detail, Icon, useNavigation } from "@raycast/api";
import { useState, useEffect, useCallback, useRef } from "react";
import { exec } from "child_process";
import { Exercise, categoryLabels, categoryIcons } from "../exercises";
import { addExerciseToHistory, CompletedExercise } from "../storage";

const PREPARATION_TIME = 10;

// macOS system sounds
const SOUND_START = "/System/Library/Sounds/Blow.aiff";
const SOUND_COMPLETE = "/System/Library/Sounds/Glass.aiff";

function playSound(soundPath: string) {
  exec(`afplay "${soundPath}"`);
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (mins > 0) {
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }
  return `${secs}s`;
}

type Phase = "ready" | "preparing" | "exercising" | "completed";

interface ExerciseSessionProps {
  exercise: Exercise;
  onComplete?: () => void;
  onAnotherExercise?: () => void;
  showAnotherButton?: boolean;
  autoStart?: boolean;
}

export function ExerciseSession({
  exercise,
  onComplete,
  onAnotherExercise,
  showAnotherButton = true,
  autoStart = false,
}: ExerciseSessionProps) {
  const { pop } = useNavigation();
  const [phase, setPhase] = useState<Phase>(autoStart ? "preparing" : "ready");
  const [prepTime, setPrepTime] = useState(PREPARATION_TIME);
  const [timeLeft, setTimeLeft] = useState(exercise.amount);
  const savedToHistory = useRef(false);

  const saveToHistory = useCallback(async () => {
    if (savedToHistory.current) return;
    savedToHistory.current = true;

    const completed: CompletedExercise = {
      exerciseId: exercise.id,
      exerciseName: exercise.name,
      category: exercise.category,
      completedAt: new Date().toISOString(),
      ...(exercise.type === "time"
        ? { duration: exercise.amount }
        : { reps: exercise.amount }),
    };
    await addExerciseToHistory(completed);
  }, [exercise]);

  const startExercise = useCallback(() => {
    setPhase("preparing");
    setPrepTime(PREPARATION_TIME);
  }, []);

  // Preparation countdown
  useEffect(() => {
    if (phase !== "preparing") return;

    if (prepTime <= 0) {
      playSound(SOUND_START);
      setPhase("exercising");
      setTimeLeft(exercise.amount);
      return;
    }

    const timer = setTimeout(() => {
      setPrepTime(prepTime - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [prepTime, phase, exercise.amount]);

  // Exercise countdown (for time-based exercises)
  useEffect(() => {
    if (phase !== "exercising" || exercise.type !== "time") return;

    if (timeLeft <= 0) {
      playSound(SOUND_COMPLETE);
      saveToHistory();
      setPhase("completed");
      onComplete?.();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, phase, exercise.type, onComplete, saveToHistory]);

  const handleComplete = () => {
    playSound(SOUND_COMPLETE);
    saveToHistory();
    setPhase("completed");
    onComplete?.();
  };

  const categoryIcon = categoryIcons[exercise.category];
  const categoryLabel = categoryLabels[exercise.category];

  const amountText =
    exercise.type === "reps"
      ? `**${exercise.amount} repeticiones**`
      : `**${formatTime(exercise.amount)}**`;

  // Build timer/status section
  let timerSection = "";

  if (phase === "ready") {
    timerSection = `\n\n---\n\n*Presiona "Empezar" cuando estés listo*`;
  } else if (phase === "preparing") {
    timerSection = `\n\n---\n\n# Prepárate!\n\n## ${prepTime}\n\n*El ejercicio comienza en ${prepTime} segundo${prepTime !== 1 ? "s" : ""}...*`;
  } else if (phase === "exercising") {
    if (exercise.type === "time") {
      const progress = Math.round(
        ((exercise.amount - timeLeft) / exercise.amount) * 100,
      );
      const progressBar =
        "█".repeat(Math.floor(progress / 5)) +
        "░".repeat(20 - Math.floor(progress / 5));
      timerSection = `\n\n---\n\n# Tiempo restante\n\n## ${formatTime(timeLeft)}\n\n\`${progressBar}\` ${progress}%`;
    } else {
      timerSection = `\n\n---\n\n# A por ello!\n\nCompleta **${exercise.amount} repeticiones**\n\n*Pulsa "Completado" cuando termines*`;
    }
  } else if (phase === "completed") {
    timerSection = `\n\n---\n\n# Completado!\n\nBuen trabajo! Has terminado el ejercicio.`;
  }

  const gifSection = exercise.gif
    ? `\n\n![${exercise.name}](${exercise.gif})\n`
    : "";

  const markdown = `
# ${categoryIcon} ${exercise.name}

**Categoría:** ${categoryLabel}

**Objetivo:** ${amountText}
${timerSection}
${gifSection}
---

## Descripción

${exercise.description}

---

## Tips

${exercise.tips.map((tip) => `- ${tip}`).join("\n")}
`;

  return (
    <Detail
      markdown={markdown}
      actions={
        <ActionPanel>
          {phase === "ready" && (
            <Action title="Empezar" icon={Icon.Play} onAction={startExercise} />
          )}
          {phase === "exercising" && exercise.type === "reps" && (
            <Action
              title="Completado"
              icon={Icon.CheckCircle}
              onAction={handleComplete}
            />
          )}
          {phase === "completed" && (
            <Action title="Volver" icon={Icon.ArrowLeft} onAction={pop} />
          )}
          {showAnotherButton &&
            phase !== "preparing" &&
            phase !== "completed" &&
            onAnotherExercise && (
              <Action
                title="Otro Ejercicio"
                icon={Icon.ArrowClockwise}
                onAction={onAnotherExercise}
                shortcut={{ modifiers: ["cmd"], key: "n" }}
              />
            )}
          {phase === "ready" && (
            <Action
              title="Cancelar"
              icon={Icon.XMarkCircle}
              onAction={pop}
              shortcut={{ modifiers: ["cmd"], key: "w" }}
            />
          )}
        </ActionPanel>
      }
    />
  );
}
