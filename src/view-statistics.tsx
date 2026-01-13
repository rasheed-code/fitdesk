import {
  Action,
  ActionPanel,
  Detail,
  Icon,
  confirmAlert,
  Alert,
} from "@raycast/api";
import { useState, useEffect } from "react";
import {
  getExerciseHistory,
  getExercisesToday,
  getExercisesThisWeek,
  getExercisesThisMonth,
  getStreak,
  clearHistory,
  CompletedExercise,
} from "./storage";
import { categoryLabels, categoryIcons, Category } from "./exercises";

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (mins > 0) {
    return `${mins}m ${secs}s`;
  }
  return `${secs}s`;
}

function getCategoryStats(
  exercises: CompletedExercise[],
): Record<string, number> {
  const stats: Record<string, number> = {};
  for (const exercise of exercises) {
    stats[exercise.category] = (stats[exercise.category] || 0) + 1;
  }
  return stats;
}

function getTotalDuration(exercises: CompletedExercise[]): number {
  return exercises.reduce((total, e) => total + (e.duration || 0), 0);
}

function getTotalReps(exercises: CompletedExercise[]): number {
  return exercises.reduce((total, e) => total + (e.reps || 0), 0);
}

export default function ViewStatistics() {
  const [history, setHistory] = useState<CompletedExercise[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadHistory = async () => {
    const data = await getExerciseHistory();
    setHistory(data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const handleClearHistory = async () => {
    if (
      await confirmAlert({
        title: "Borrar Historial",
        message:
          "¿Estás seguro de que quieres borrar todo el historial de ejercicios?",
        primaryAction: {
          title: "Borrar",
          style: Alert.ActionStyle.Destructive,
        },
      })
    ) {
      await clearHistory();
      setHistory([]);
    }
  };

  const today = getExercisesToday(history);
  const thisWeek = getExercisesThisWeek(history);
  const thisMonth = getExercisesThisMonth(history);
  const streak = getStreak(history);

  const weeklyStats = getCategoryStats(thisWeek);
  const totalDurationWeek = getTotalDuration(thisWeek);
  const totalRepsWeek = getTotalReps(thisWeek);

  // Build category breakdown
  const categoryBreakdown = (Object.keys(categoryLabels) as Category[])
    .map((cat) => {
      const count = weeklyStats[cat] || 0;
      if (count === 0) return null;
      return `- ${categoryIcons[cat]} ${categoryLabels[cat]}: **${count}** ejercicio${count !== 1 ? "s" : ""}`;
    })
    .filter(Boolean)
    .join("\n");

  // Recent exercises (last 5)
  const recentExercises = history
    .slice(0, 5)
    .map((e) => {
      const date = new Date(e.completedAt);
      const timeStr = date.toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
      });
      const dateStr = date.toLocaleDateString("es-ES", {
        weekday: "short",
        day: "numeric",
        month: "short",
      });
      const amount = e.duration ? formatDuration(e.duration) : `${e.reps} reps`;
      return `| ${categoryIcons[e.category as Category] || "🏃"} ${e.exerciseName} | ${amount} | ${dateStr} ${timeStr} |`;
    })
    .join("\n");

  // Motivational message based on streak
  let streakMessage = "";
  if (streak === 0) {
    streakMessage = "Empieza hoy tu racha de ejercicios!";
  } else if (streak === 1) {
    streakMessage = "Buen comienzo! Mantén el ritmo mañana.";
  } else if (streak < 7) {
    streakMessage = `${streak} días seguidos! Vas por buen camino.`;
  } else if (streak < 30) {
    streakMessage = `${streak} días! Eres imparable!`;
  } else {
    streakMessage = `${streak} días! Eres una leyenda del fitness!`;
  }

  const markdown = `
# Estadísticas de FitDesk

## Resumen

| Período | Ejercicios |
|---------|------------|
| Hoy | **${today.length}** |
| Esta semana | **${thisWeek.length}** |
| Este mes | **${thisMonth.length}** |
| Total histórico | **${history.length}** |

---

## Racha Actual

# ${streak} ${streak === 1 ? "día" : "días"} 🔥

*${streakMessage}*

---

## Esta Semana

${
  thisWeek.length > 0
    ? `
**Tiempo total:** ${formatDuration(totalDurationWeek)}

**Repeticiones totales:** ${totalRepsWeek}

### Por Categoría

${categoryBreakdown || "*Sin ejercicios esta semana*"}
`
    : "*No has hecho ejercicios esta semana. Es hora de empezar!*"
}

---

## Últimos Ejercicios

${
  history.length > 0
    ? `
| Ejercicio | Cantidad | Fecha |
|-----------|----------|-------|
${recentExercises}
`
    : "*No hay ejercicios en el historial*"
}
`;

  return (
    <Detail
      isLoading={isLoading}
      markdown={markdown}
      actions={
        <ActionPanel>
          <Action
            title="Actualizar"
            icon={Icon.ArrowClockwise}
            onAction={loadHistory}
            shortcut={{ modifiers: ["cmd"], key: "r" }}
          />
          {history.length > 0 && (
            <Action
              title="Borrar Historial"
              icon={Icon.Trash}
              style={Action.Style.Destructive}
              onAction={handleClearHistory}
              shortcut={{ modifiers: ["cmd", "shift"], key: "backspace" }}
            />
          )}
        </ActionPanel>
      }
    />
  );
}
