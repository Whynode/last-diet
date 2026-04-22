// Food items - matching mobile app
export type FoodItem = { id: string; name: string; note?: string };

export const WHITELIST: FoodItem[] = [
  { id: "w1", name: "Telur Rebus", note: "2-3 butir, sumber protein" },
  { id: "w2", name: "Ubi Rebus", note: "Karbohidrat kompleks pagi hari" },
  { id: "w3", name: "Kentang Rebus", note: "Pengganti nasi yang mengenyangkan" },
  { id: "w4", name: "Air Putih 2 Liter", note: "Minimal 8 gelas sepanjang hari" },
  { id: "w5", name: "Sayur Hijau", note: "Bayam, brokoli, atau kangkung" },
  { id: "w6", name: "Buah Segar", note: "Apel, pir, alpukat, atau stroberi" },
  { id: "w7", name: "Ikan / Tahu / Tempe", note: "Sumber protein nabati & laut" },
  { id: "w8", name: "Yoghurt Plain", note: "Tanpa gula tambahan" },
];

export const BLACKLIST: FoodItem[] = [
  { id: "b1", name: "Gorengan", note: "Tinggi lemak trans" },
  { id: "b2", name: "Gula & Minuman Manis", note: "Soda, teh kemasan, sirup" },
  { id: "b3", name: "Mie Instan", note: "Tinggi sodium & pengawet" },
  { id: "b4", name: "Nasi Putih Berlebih", note: "Maksimal 1 centong saja" },
  { id: "b5", name: "Snack Kemasan", note: "Keripik, biskuit, coklat" },
  { id: "b6", name: "Fast Food", note: "Burger, pizza, fried chicken" },
];