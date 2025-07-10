import { fetchCourses, deleteCourse } from '../services/courseService.js';

export async function renderCourseList(containerId, onViewDetail, onEdit, onDelete) {
  const courses = await fetchCourses();
  const container = document.getElementById(containerId);
  container.innerHTML = '';

  courses.forEach(course => {
    const div = document.createElement('div');
    div.className = 'bg-white p-4 rounded shadow flex justify-between items-center mb-2';

    const teacherName = course.teacher
      ? `${course.teacher.firstName} ${course.teacher.lastName}`
      : 'Unassigned';

    div.innerHTML = `
      <div>
        <h3 class="font-bold text-lg">${course.name}</h3>
        <p class="text-sm text-gray-600">Cycle ${course.cycle} - ${course.credits} credits</p>
        <p class="text-sm text-gray-700">Teacher: ${teacherName}</p>
      </div>
      <div class="space-x-2">
        <button data-id="${course.id}" class="btn-view text-blue-600">🔍</button>
        <button data-id="${course.id}" class="btn-edit text-yellow-600">✏️</button>
        <button data-id="${course.id}" class="btn-delete text-red-600">🗑️</button>
      </div>
    `;

    container.appendChild(div);
  });

  // event bindings
  container.querySelectorAll('.btn-view').forEach(btn =>
    btn.addEventListener('click', () => onViewDetail(btn.dataset.id))
  );
  container.querySelectorAll('.btn-edit').forEach(btn =>
    btn.addEventListener('click', () => onEdit(btn.dataset.id))
  );
  container.querySelectorAll('.btn-delete').forEach(btn =>
    btn.addEventListener('click', async () => {
      const confirm = await Swal.fire({
        title: 'Are you sure?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
      });
      if (confirm.isConfirmed) {
        try {
          await deleteCourse(btn.dataset.id);
          Swal.fire('Deleted!', 'Course has been deleted.', 'success');
          onDelete();
        } catch (err) {
          Swal.fire('Error', err.message, 'error');
        }
      }
    })
  );
}

