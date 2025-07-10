import { API_BASE_URL } from '../env.js';

export async function fetchTeachers() {
  const res = await fetch(`${API_BASE_URL}/Teachers`);
  const raw = await res.json();
  return raw.$values;
}
