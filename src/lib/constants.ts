// Plank constants - matching mobile app
export const TOTAL_DAYS = 30;

export function getPlankTargetForDay(day: number): number {
  if (day <= 7) return 40;
  if (day <= 14) return 60;
  if (day <= 21) return 90;
  return 120;
}

export function getWeekLabel(day: number): string {
  if (day <= 7) return "Minggu 1 — Foundation";
  if (day <= 14) return "Minggu 2 — Build";
  if (day <= 21) return "Minggu 3 — Strengthen";
  return "Minggu 4 — Master";
}

export function getDailyQuote(day: number): string {
  const quotes = [
    "Hari baru, semangat baru, Nurul Sayang!",
    "Konsistensi mengalahkan intensitas.",
    "Tubuh sehat adalah hadiah terbaik.",
    "Setiap detik plank adalah investasi.",
    "Kamu lebih kuat dari yang kamu kira.",
    "Disiplin hari ini, bangga selamanya.",
    "Sedikit demi sedikit, lama-lama menjadi bukit.",
  ];
  return quotes[day % quotes.length] ?? quotes[0] ?? "";
}