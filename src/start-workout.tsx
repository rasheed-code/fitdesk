import { Action, ActionPanel, Detail, Icon, useNavigation } from "@raycast/api";
import { useState, useEffect, useCallback } from "react";
import {
  Exercise,
  getRandomExercise,
  categoryLabels,
  categoryIcons,
} from "./exercises";

const PREPARATION_TIME = 10;

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (mins > 0) {
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }
  return `${secs}s`;
}

type Phase = "ready" | "preparing" | "exercising" | "completed";

function ExerciseView({
  exercise,
  onComplete,
  onSkip,
  onNewExercise,
}: {
  exercise: Exercise;
  onComplete: () => void;
  onSkip: () => void;
  onNewExercise: () => void;
}) {
  const [phase, setPhase] = useState<Phase>("ready");
  const [prepTime, setPrepTime] = useState(PREPARATION_TIME);
  const [timeLeft, setTimeLeft] = useState(exercise.amount);

  const startExercise = useCallback(() => {
    setPhase("preparing");
    setPrepTime(PREPARATION_TIME);
  }, []);

  // Preparation countdown
  useEffect(() => {
    if (phase !== "preparing") return;

    if (prepTime <= 0) {
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
      setPhase("completed");
      onComplete();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, phase, exercise.type, onComplete]);

  const handleComplete = () => {
    setPhase("completed");
    onComplete();
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

  const markdown = `
# ${categoryIcon} ${exercise.name}

**Categoría:** ${categoryLabel}

**Objetivo:** ${amountText}
${timerSection}

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
          {phase !== "preparing" && phase !== "completed" && (
            <Action
              title="Otro Ejercicio"
              icon={Icon.ArrowClockwise}
              onAction={onNewExercise}
              shortcut={{ modifiers: ["cmd"], key: "n" }}
            />
          )}
          {phase === "ready" && (
            <Action
              title="Saltar"
              icon={Icon.Forward}
              onAction={onSkip}
              shortcut={{ modifiers: ["cmd"], key: "s" }}
            />
          )}
        </ActionPanel>
      }
    />
  );
}

function CompletedView({
  exercisesCompleted,
  onContinue,
  onFinish,
}: {
  exercisesCompleted: number;
  onContinue: () => void;
  onFinish: () => void;
}) {
  const markdown = `
# Ejercicio Completado!

Has completado **${exercisesCompleted}** ejercicio${exercisesCompleted > 1 ? "s" : ""} en esta sesión.

---

Quieres continuar con otro ejercicio o terminar la sesión?
`;

  return (
    <Detail
      markdown={markdown}
      actions={
        <ActionPanel>
          <Action
            title="Continuar Con Otro"
            icon={Icon.Play}
            onAction={onContinue}
          />
          <Action
            title="Terminar Sesión"
            icon={Icon.Stop}
            onAction={onFinish}
          />
        </ActionPanel>
      }
    />
  );
}

function SummaryView({ exercisesCompleted }: { exercisesCompleted: number }) {
  const { pop } = useNavigation();

  const messages = [
    "Cada movimiento cuenta!",
    "Tu cuerpo te lo agradece!",
    "Constancia es la clave!",
    "Pequeños pasos, grandes resultados!",
    "Sigue así!",
  ];
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];

  const markdown = `
# Sesión Completada!

## Resumen

- **Ejercicios realizados:** ${exercisesCompleted}

---

*${randomMessage}*

Nos vemos en el próximo descanso!
`;

  return (
    <Detail
      markdown={markdown}
      actions={
        <ActionPanel>
          <Action title="Cerrar" icon={Icon.XMarkCircle} onAction={pop} />
        </ActionPanel>
      }
    />
  );
}

export default function StartWorkout() {
  const [exercise, setExercise] = useState<Exercise>(getRandomExercise);
  const [exercisesCompleted, setExercisesCompleted] = useState(0);
  const [showCompleted, setShowCompleted] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [key, setKey] = useState(0);

  const handleComplete = () => {
    setExercisesCompleted((prev) => prev + 1);
    setShowCompleted(true);
  };

  const handleSkip = () => {
    setExercise(getRandomExercise());
    setKey((k) => k + 1);
  };

  const handleNewExercise = () => {
    setExercise(getRandomExercise());
    setShowCompleted(false);
    setKey((k) => k + 1);
  };

  const handleContinue = () => {
    setExercise(getRandomExercise());
    setShowCompleted(false);
    setKey((k) => k + 1);
  };

  const handleFinish = () => {
    setShowSummary(true);
  };

  if (showSummary) {
    return <SummaryView exercisesCompleted={exercisesCompleted} />;
  }

  if (showCompleted) {
    return (
      <CompletedView
        exercisesCompleted={exercisesCompleted}
        onContinue={handleContinue}
        onFinish={handleFinish}
      />
    );
  }

  return (
    <ExerciseView
      key={key}
      exercise={exercise}
      onComplete={handleComplete}
      onSkip={handleSkip}
      onNewExercise={handleNewExercise}
    />
  );
}
