import { renderCourseList } from '../components/CourseList.js';
import { fetchCourseById, updateCourse } from '../services/courseService.js';

// Recarga la lista de cursos
async function loadCourses() {
  await renderCourseList('courseList', handleViewDetail, handleEdit, loadCourses);
}

// Ver detalle de un curso (SweetAlert)
async function handleViewDetail(id) {
  const course = await fetchCourseById(id);
  Swal.fire({
    title: course.name,
    html: `
      <p><strong>Créditos:</strong> ${course.credits}</p>
      <p><strong>Horas/Semana:</strong> ${course.weeklyHours}</p>
      <p><strong>Ciclo:</strong> ${course.cycle}</p>
      <p><strong>Docente:</strong> ${course.teacher?.firstName ?? ''} ${course.teacher?.lastName ?? ''}</p>
    `,
    confirmButtonText: 'Cerrar'
  });
}

// Editar un curso (SweetAlert con validación)
async function handleEdit(id) {
  const course = await fetchCourseById(id);

  const { value: formValues } = await Swal.fire({
    title: 'Editar curso',
    html: `
      <input id="swal-name" class="swal2-input" placeholder="Nombre" value="${course.name}">
      <input id="swal-credits" class="swal2-input" type="number" min="0" placeholder="Créditos" value="${course.credits}">
      <input id="swal-weeklyHours" class="swal2-input" type="number" min="0" placeholder="Horas/Semana" value="${course.weeklyHours}">
      <input id="swal-cycle" class="swal2-input" type="number" min="0" placeholder="Ciclo" value="${course.cycle}">
    `,
    focusConfirm: false,
    showCancelButton: true,
    cancelButtonText: 'Cancelar',
    confirmButtonText: 'Guardar cambios',
    preConfirm: () => {
      const name = document.getElementById('swal-name').value.trim();
      const credits = parseInt(document.getElementById('swal-credits').value);
      const weeklyHours = parseInt(document.getElementById('swal-weeklyHours').value);
      const cycle = parseInt(document.getElementById('swal-cycle').value);

      if (!name || isNaN(credits) || isNaN(weeklyHours) || isNaN(cycle)) {
        Swal.showValidationMessage('Todos los campos son obligatorios y deben ser válidos.');
        return false;
      }
      return {
        id: course.id,
        name,
        credits,
        weeklyHours,
        cycle,
        teacherId: course.teacherId
      };
    }
  });

  if (formValues) {
    try {
      await updateCourse(id, formValues);
      Swal.fire('Actualizado', 'El curso fue actualizado correctamente.', 'success');
      loadCourses();
    } catch (err) {
      Swal.fire('Error', err.message, 'error');
    }
  }
}

document.addEventListener('DOMContentLoaded', loadCourses);
