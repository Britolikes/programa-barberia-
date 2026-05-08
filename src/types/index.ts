export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'barber';
  phone?: string;
  birthDate?: string;
  address?: string;
  avatar?: string;
}

export interface Barber {
  id: string;
  name: string;
  specialty: string;
  available: boolean;
  email?: string;
  image?: string;
  calendlyUrl?: string; // Nuevo: URL de Calendly personal
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  durationMinutes: number;
}
