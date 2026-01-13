export type ExerciseType = "reps" | "time";

export type Category = "upper" | "core" | "lower" | "cardio" | "full-body";

export interface Exercise {
  id: string;
  name: string;
  category: Category;
  type: ExerciseType;
  amount: number; // reps or seconds
  description: string;
  tips: string[];
  gif?: string;
}

export const categoryLabels: Record<Category, string> = {
  upper: "Tren Superior",
  core: "Core",
  lower: "Tren Inferior",
  cardio: "Cardio",
  "full-body": "Cuerpo Completo",
};

export const categoryIcons: Record<Category, string> = {
  upper: "💪",
  core: "🎯",
  lower: "🦵",
  cardio: "❤️",
  "full-body": "🔥",
};

export const exercises: Exercise[] = [
  // TREN SUPERIOR
  {
    id: "pushups",
    name: "Flexiones",
    category: "upper",
    type: "reps",
    amount: 15,
    description: "Flexiones clásicas con las manos a la altura de los hombros",
    tips: [
      "Mantén el cuerpo recto como una tabla",
      "Baja hasta que el pecho casi toque el suelo",
      "Si es muy difícil, hazlas de rodillas",
    ],
    gif: "https://media.giphy.com/media/kYvaNlsFBgq3xZ8fRn/giphy.gif",
  },
  {
    id: "incline-pushups",
    name: "Flexiones Inclinadas",
    category: "upper",
    type: "reps",
    amount: 15,
    description: "Flexiones con las manos apoyadas en el escritorio o silla",
    tips: [
      "Ideal para principiantes",
      "Cuanto más vertical, más fácil",
      "Mantén los codos cerca del cuerpo",
    ],
    gif: "https://media.giphy.com/media/2yuPBGrg5DagENk59X/giphy.gif",
  },
  {
    id: "tricep-dips",
    name: "Fondos de Tríceps",
    category: "upper",
    type: "reps",
    amount: 12,
    description: "Fondos usando una silla o escritorio como apoyo",
    tips: [
      "Mantén la espalda cerca de la silla",
      "Baja hasta que los codos formen 90 grados",
      "No dejes que los hombros suban hacia las orejas",
    ],
    gif: "https://media.giphy.com/media/wKdb2xwADyl3hQZmZh/giphy.gif",
  },
  {
    id: "diamond-pushups",
    name: "Flexiones Diamante",
    category: "upper",
    type: "reps",
    amount: 10,
    description: "Flexiones con las manos juntas formando un diamante",
    tips: [
      "Junta los pulgares e índices",
      "Trabaja más los tríceps",
      "Mantén los codos pegados al cuerpo",
    ],
    gif: "https://media.giphy.com/media/JZPaw2Y2oENHcZrHja/giphy.gif",
  },
  {
    id: "wide-pushups",
    name: "Flexiones Abiertas",
    category: "upper",
    type: "reps",
    amount: 12,
    description: "Flexiones con las manos más separadas que los hombros",
    tips: [
      "Trabaja más el pecho",
      "Mantén el core apretado",
      "No dejes caer la cadera",
    ],
    gif: "https://media.giphy.com/media/7YCC7PTNX2TOhJQ6aW/giphy.gif",
  },

  // CORE
  {
    id: "plank",
    name: "Plancha",
    category: "core",
    type: "time",
    amount: 45,
    description: "Mantén la posición de plancha con los antebrazos apoyados",
    tips: [
      "Cuerpo en línea recta de cabeza a talones",
      "Aprieta glúteos y abdomen",
      "No dejes caer la cadera",
    ],
    gif: "https://media.giphy.com/media/ZcteOOkovIh9HaVFjT/giphy.gif",
  },
  {
    id: "crunches",
    name: "Abdominales",
    category: "core",
    type: "reps",
    amount: 20,
    description: "Abdominales clásicos tumbado boca arriba",
    tips: [
      "No tires del cuello con las manos",
      "Exhala al subir",
      "Movimiento controlado, no uses impulso",
    ],
    gif: "https://media.giphy.com/media/d4bnhtIfWQQt8qv6/giphy.gif",
  },
  {
    id: "mountain-climbers",
    name: "Mountain Climbers",
    category: "core",
    type: "time",
    amount: 30,
    description:
      "Desde posición de plancha, alterna llevando rodillas al pecho",
    tips: ["Mantén la cadera baja", "Ritmo constante", "Core siempre activado"],
    gif: "https://media.giphy.com/media/VzlPEkuoqlgjehxvxk/giphy.gif",
  },
  {
    id: "side-plank",
    name: "Plancha Lateral",
    category: "core",
    type: "time",
    amount: 30,
    description: "Plancha de lado apoyando un antebrazo",
    tips: [
      "Cadera alta, no dejes que caiga",
      "Haz ambos lados",
      "Puedes apoyar la rodilla inferior si es muy difícil",
    ],
    gif: "https://media.giphy.com/media/jpL8gAOyUasNPHHASL/giphy.gif",
  },
  {
    id: "leg-raises",
    name: "Elevación de Piernas",
    category: "core",
    type: "reps",
    amount: 15,
    description: "Tumbado boca arriba, sube las piernas juntas",
    tips: [
      "Mantén la espalda baja pegada al suelo",
      "Baja lento y controlado",
      "Puedes doblar ligeramente las rodillas",
    ],
    gif: "https://media.giphy.com/media/mVpOJcNBGPwzlfkTxJ/giphy.gif",
  },
  {
    id: "russian-twists",
    name: "Giros Rusos",
    category: "core",
    type: "reps",
    amount: 20,
    description: "Sentado con pies elevados, gira el torso de lado a lado",
    tips: [
      "Mantén la espalda recta",
      "Los pies no tocan el suelo",
      "Gira desde el core, no solo los brazos",
    ],
    gif: "https://media.giphy.com/media/cpKD9u3S25xYL8tcbr/giphy.gif",
  },

  // TREN INFERIOR
  {
    id: "squats",
    name: "Sentadillas",
    category: "lower",
    type: "reps",
    amount: 20,
    description: "Sentadillas con el peso del cuerpo",
    tips: [
      "Rodillas en línea con los pies",
      "Baja hasta que los muslos estén paralelos al suelo",
      "Mantén el pecho arriba",
    ],
    gif: "https://media.giphy.com/media/1qfKN8Dt0CRdCRxz9q/giphy.gif",
  },
  {
    id: "lunges",
    name: "Zancadas",
    category: "lower",
    type: "reps",
    amount: 12,
    description: "Zancadas alternando piernas",
    tips: [
      "Rodilla trasera casi toca el suelo",
      "Rodilla delantera no pasa la punta del pie",
      "Mantén el torso erguido",
    ],
    gif: "https://media.giphy.com/media/ddR8T7OIILMK8H2YEh/giphy.gif",
  },
  {
    id: "wall-sit",
    name: "Sentadilla en Pared",
    category: "lower",
    type: "time",
    amount: 45,
    description: "Mantén posición de sentadilla apoyado en la pared",
    tips: [
      "Muslos paralelos al suelo",
      "Espalda completamente apoyada",
      "Respira de forma constante",
    ],
    gif: "https://media.giphy.com/media/NaKGjtR1bMgVTH5Rds/giphy.gif",
  },
  {
    id: "calf-raises",
    name: "Elevaciones de Talón",
    category: "lower",
    type: "reps",
    amount: 20,
    description: "Ponte de puntillas y baja lentamente",
    tips: [
      "Sube lo más alto posible",
      "Baja controlado",
      "Puedes hacerlo en un escalón para más rango",
    ],
    gif: "https://media.giphy.com/media/2wXXVCek2NfkneGqz9/giphy.gif",
  },
  {
    id: "glute-bridges",
    name: "Puente de Glúteos",
    category: "lower",
    type: "reps",
    amount: 15,
    description: "Tumbado boca arriba, eleva la cadera apretando glúteos",
    tips: [
      "Aprieta los glúteos arriba",
      "Mantén 2 segundos arriba",
      "No arquees la espalda baja",
    ],
    gif: "https://media.giphy.com/media/SJWtWnRFsTiNVSECVP/giphy.gif",
  },
  {
    id: "jump-squats",
    name: "Sentadillas con Salto",
    category: "lower",
    type: "reps",
    amount: 12,
    description: "Sentadilla seguida de un salto explosivo",
    tips: [
      "Aterriza suave con las rodillas flexionadas",
      "Usa los brazos para impulsarte",
      "Movimiento continuo y fluido",
    ],
    gif: "https://media.giphy.com/media/WtnkfTBF2D2OsODSxf/giphy.gif",
  },

  // CARDIO
  {
    id: "jumping-jacks",
    name: "Jumping Jacks",
    category: "cardio",
    type: "time",
    amount: 45,
    description: "Saltos abriendo y cerrando piernas y brazos",
    tips: [
      "Mantén un ritmo constante",
      "Aterriza suave",
      "Brazos completamente extendidos arriba",
    ],
    gif: "https://media.giphy.com/media/RgtuKqJ8rPII4qdRjp/giphy.gif",
  },
  {
    id: "high-knees",
    name: "Rodillas Arriba",
    category: "cardio",
    type: "time",
    amount: 30,
    description: "Corre en el sitio llevando las rodillas al pecho",
    tips: [
      "Rodillas a la altura de la cadera",
      "Usa los brazos",
      "Mantén el core apretado",
    ],
    gif: "https://media.giphy.com/media/lboo9np8SJ58sSlGg8/giphy.gif",
  },
  {
    id: "butt-kicks",
    name: "Talones al Glúteo",
    category: "cardio",
    type: "time",
    amount: 30,
    description: "Corre en el sitio llevando los talones a los glúteos",
    tips: [
      "Talón toca el glúteo",
      "Mantén el torso erguido",
      "Ritmo rápido y constante",
    ],
    gif: "https://media.giphy.com/media/l2RnAY30gjJ6ukKJy/giphy.gif",
  },

  // CUERPO COMPLETO
  {
    id: "burpees",
    name: "Burpees",
    category: "full-body",
    type: "reps",
    amount: 8,
    description: "Sentadilla, plancha, flexión, salto - el ejercicio completo",
    tips: [
      "Movimiento fluido sin pausas",
      "Puedes eliminar la flexión si es muy difícil",
      "Aterriza suave en el salto",
    ],
    gif: "https://media.giphy.com/media/KxuGSIZU1QZfRiRx4h/giphy.gif",
  },
  {
    id: "burpees-no-pushup",
    name: "Burpees Sin Flexión",
    category: "full-body",
    type: "reps",
    amount: 10,
    description: "Versión más accesible: sentadilla, plancha, salto",
    tips: [
      "Ideal para empezar",
      "Mantén el ritmo",
      "Salta con los brazos arriba",
    ],
    gif: "https://media.giphy.com/media/3ohzdHUsLjzIEkK56E/giphy.gif",
  },
  {
    id: "squat-to-press",
    name: "Sentadilla con Press",
    category: "full-body",
    type: "reps",
    amount: 15,
    description: "Sentadilla y al subir extiende los brazos hacia arriba",
    tips: [
      "Movimiento explosivo al subir",
      "Brazos completamente estirados arriba",
      "Puedes añadir peso si tienes algo a mano",
    ],
    gif: "https://media.giphy.com/media/1jWIiKGHlkbtULERvB/giphy.gif",
  },
  {
    id: "inchworms",
    name: "Inchworm",
    category: "full-body",
    type: "reps",
    amount: 8,
    description: "Desde de pie, camina con las manos hasta plancha y vuelve",
    tips: [
      "Piernas lo más rectas posible",
      "Añade una flexión en la plancha para más intensidad",
      "Movimiento controlado",
    ],
    gif: "https://media.giphy.com/media/9cRdH6mSSANlnPtfYD/giphy.gif",
  },
];

export function getRandomExercise(): Exercise {
  return exercises[Math.floor(Math.random() * exercises.length)];
}

export function getExercisesByCategory(category: Category): Exercise[] {
  return exercises.filter((e) => e.category === category);
}

export function getRandomExerciseByCategory(category: Category): Exercise {
  const categoryExercises = getExercisesByCategory(category);
  return categoryExercises[
    Math.floor(Math.random() * categoryExercises.length)
  ];
}
