import { renderTeacherOptions } from '../components/TeacherSelect.js';
import { createCourse } from '../services/courseService.js';

document.addEventListener('DOMContentLoaded', () => {
  renderTeacherOptions('teacherId');

  document.getElementById('courseForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const course = {
      name: document.getElementById('name').value.trim(),
      credits: parseInt(document.getElementById('credits').value),
      weeklyHours: parseInt(document.getElementById('weeklyHours').value),
      cycle: parseInt(document.getElementById('cycle').value),
      teacherId: parseInt(document.getElementById('teacherId').value)
    };

    try {
      await createCourse(course);
    Swal.fire('Success', 'Course registered successfully!', 'success').then(() => {
  window.location.reload();
});

    } catch (err) {
      Swal.fire('Error', err.message, 'error');
    }
  });
});
