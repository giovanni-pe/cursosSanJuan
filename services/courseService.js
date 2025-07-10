import { API_BASE_URL } from '../env.js';

export async function createCourse(course) {
  const res = await fetch(`${API_BASE_URL}/Courses`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(course)
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || 'Failed to create course');
  }

  return res.json();
}

export async function fetchCourses() {
  const res = await fetch(`${API_BASE_URL}/Courses`);
  const raw = await res.json();
  return raw.$values;
}

export async function fetchCourseById(id) {
  const res = await fetch(`${API_BASE_URL}/Courses/${id}`);
  return await res.json();
}

export async function updateCourse(id, course) {
  const res = await fetch(`${API_BASE_URL}/Courses/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(course),
  });
  if (!res.ok) throw new Error('Update failed');
}

export async function deleteCourse(id) {
  const res = await fetch(`${API_BASE_URL}/Courses/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Delete failed');
}