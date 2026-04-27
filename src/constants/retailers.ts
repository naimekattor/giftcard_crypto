export const RETAILERS = [
  { id: 'amazon', name: 'Amazon', color: '#FF9900' },
  { id: 'google-play', name: 'Google Play', color: '#34A853' },
  { id: 'apple', name: 'Apple / iTunes', color: '#000000' },
  { id: 'steam', name: 'Steam', color: '#171a21' },
  { id: 'playstation', name: 'PlayStation', color: '#003087' },
  { id: 'xbox', name: 'Xbox', color: '#107C10' },
  { id: 'netflix', name: 'Netflix', color: '#E50914' },
  { id: 'spotify', name: 'Spotify', color: '#1DB954' },
  { id: 'nintendo', name: 'Nintendo eShop', color: '#E60012' },
] as const;

export type RetailerId = (typeof RETAILERS)[number]['id'];
