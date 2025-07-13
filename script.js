const cursos = {
  // Formato: idCurso: { nombre, detalles, prereqs: [], semestre }
  "ingles-basico": {
    nombre: "Inglés básico",
    detalles: "Abre Inglés I",
    prereqs: [],
    semestre: "Semestre 0"
  },
  "ingles-1": {
    nombre: "Inglés I",
    detalles: "Abre Inglés II",
    prereqs: ["ingles-basico"],
    semestre: "Semestre 2"
  },
  "ingles-2": {
    nombre: "Inglés II",
    detalles: "Abre Metodología de la investigación",
    prereqs: ["ingles-1"],
    semestre: "Semestre 3"
  }
  // Agrega todos los cursos con su id único y prerrequisitos aquí
};

const estado = JSON.parse(localStorage.getItem("mallaEstado")) || {};

function guardarEstado() {
  localStorage.setItem("mallaEstado", JSON.stringify(estado));
}

function crearMalla() {
  const contenedor = document.getElementById("malla-container");
  contenedor.innerHTML = "";

  // Agrupar cursos por semestre
  const semestres = {};
  for (const [id, curso] of Object.entries(cursos)) {
    if (!semestres[curso.semestre]) semestres[curso.semestre] = [];
    semestres[curso.semestre].push({ ...curso, id });
  }

  for (const [semestre, lista] of Object.entries(semestres)) {
    const col = document.createElement("div");
    col.className = "semestre";
    const titulo = document.createElement("h2");
    titulo.textContent = semestre;
    col.appendChild(titulo);

    lista.forEach(curso => {
      const div = document.createElement("div");
      div.className = "curso";
      div.dataset.id = curso.id;

      const nombre = document.createElement("div");
      nombre.className = "nombre";
      nombre.textContent = curso.nombre;

      const detalle = document.createElement("div");
      detalle.className = "detalle";
      detalle.textContent = curso.detalles || "";

      div.appendChild(nombre);
      div.appendChild(detalle);

      // Estado visual
      if (estado[curso.id]) div.classList.add("aprobado");
      else if (curso.prereqs.every(id => estado[id])) div.classList.add("desbloqueado");

      // Click
      div.addEventListener("click", () => {
        if (div.classList.contains("desbloqueado") || div.classList.contains("aprobado")) {
          estado[curso.id] = !estado[curso.id];
          guardarEstado();
          crearMalla(); // volver a pintar
        }
      });

      col.appendChild(div);
    });

    contenedor.appendChild(col);
  }
}

crearMalla();
