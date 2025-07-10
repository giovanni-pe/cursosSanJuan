import { fetchTeachers } from '../services/teacherService.js';

export async function renderTeacherOptions(selectId) {
  const teachers = await fetchTeachers();
  const select = document.getElementById(selectId);

  teachers.forEach(t => {
    const opt = document.createElement('option');
    opt.value = t.id;
    opt.textContent = `${t.firstName} ${t.lastName}`;
    select.appendChild(opt);
  });
}
