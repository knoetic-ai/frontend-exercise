import type { User } from '../types';

const API_BASE = '/api';

export async function fetchCurrentUser(): Promise<User> {
  const response = await fetch(`${API_BASE}/me`);

  if (!response.ok) {
    throw new Error('Failed to fetch current user');
  }

  return response.json();
}
