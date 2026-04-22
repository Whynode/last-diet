// Simple WhatsApp - just open WhatsApp with pre-filled message
// No API needed - uses wa.me link

export function openWhatsApp(phone: string, message: string): void {
  // Format phone (remove +, spaces, etc)
  const formattedPhone = phone.replace(/[^0-9]/g, '');
  
  // Create WhatsApp Web URL with pre-filled message
  const url = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`;
  
  // Open in new tab
  window.open(url, '_blank');
}

// Format message for WhatsApp
export function formatWhatsAppMessage(data: {
  day: number;
  whitelist: string[];
  workout: string[];
  plankBest: number;
  weight?: number;
}): string {
  const lines = [
    `🏃 *LAPORAN HARIAN - Nurul Sayang*`,
    ``,
    `📅 Hari ke-${data.day}`,
    ``,
    `🥗 Diet: ${data.whitelist.length} items`,
    `💪 Workout: ${data.workout.length} gerakan`,
    `⏱️ Plank: ${data.plankBest} detik`,
  ];
  
  if (data.weight) {
    lines.push(`⚖️ Berat: ${data.weight} kg`);
  }
  
  lines.push('');
  lines.push(`Semangat Nurul Sayang! 💕`);
  lines.push(`- Mas Arya`);
  
  return lines.join('\n');
}