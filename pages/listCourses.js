import { renderCourseList } from '../components/CourseList.js';
import { fetchCourseById, updateCourse } from '../services/courseService.js';

async function loadCourses() {
  await renderCourseList('courseList', handleViewDetail, handleEdit, loadCourses);
}

async function handleViewDetail(id) {
  const course = await fetchCourseById(id);
  Swal.fire({
    title: course.name,
    html: `
      <p><strong>Credits:</strong> ${course.credits}</p>
      <p><strong>Hours:</strong> ${course.weeklyHours}</p>
      <p><strong>Cycle:</strong> ${course.cycle}</p>
      <p><strong>Teacher:</strong> ${course.teacher.firstName} ${course.teacher.lastName}</p>
    `
  });
}

async function handleEdit(id) {
  const course = await fetchCourseById(id);

  const { value: formValues } = await Swal.fire({
    title: 'Edit Course',
    html: `
      <input id="name" class="swal2-input" placeholder="Name" value="${course.name}">
      <input id="credits" class="swal2-input" type="number" value="${course.credits}">
      <input id="weeklyHours" class="swal2-input" type="number" value="${course.weeklyHours}">
      <input id="cycle" class="swal2-input" type="number" value="${course.cycle}">
    `,
    focusConfirm: false,
    preConfirm: () => {
      return {
        id: course.id,
        name: document.getElementById('name').value,
        credits: parseInt(document.getElementById('credits').value),
        weeklyHours: parseInt(document.getElementById('weeklyHours').value),
        cycle: parseInt(document.getElementById('cycle').value),
        teacherId: course.teacherId
      };
    }
  });

  if (formValues) {
    try {
      await updateCourse(id, formValues);
      Swal.fire('Updated', 'Course updated successfully', 'success');
      loadCourses();
    } catch (err) {
      Swal.fire('Error', err.message, 'error');
    }
  }
}

document.addEventListener('DOMContentLoaded', loadCourses);
