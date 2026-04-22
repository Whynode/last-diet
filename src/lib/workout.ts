// Workout exercises - matching mobile app
export type Exercise = {
  id: string;
  name: string;
  target: string;
  icon: string;
};

export const WORKOUT: Exercise[] = [
  { id: "e1", name: "Jumping Jacks", target: "60 detik", icon: "wind" },
  { id: "e2", name: "Squats", target: "20 reps", icon: "trending-down" },
  { id: "e3", name: "Mountain Climbers", target: "45 detik", icon: "activity" },
  { id: "e4", name: "Burpees", target: "10-12 reps", icon: "zap" },
];