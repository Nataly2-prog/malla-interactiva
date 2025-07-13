const malla = {
  "Semestre 0": [
    {
      nombre: "Examen Diagnóstico",
    },
    {
      nombre: "Inglés básico",
      detalles: "Abre Inglés I",
    }
  ],
  "Semestre 1": [
    {
      nombre: "Biología general para entornos laborales",
      detalles: "Abre Agentes ambientales biológicos"
    },
    {
      nombre: "Comunicación escrita",
      detalles: "Abre Comunicación oral, Ambiente humano"
    },
    {
      nombre: "Introducción a la técnica ciencia y tecnología"
    },
    {
      nombre: "Matemática general",
      detalles: "Abre Cálculo diferencial e integral"
    },
    {
      nombre: "Laboratorio de química básica I",
      detalles: "Correquisito Química básica I. Abre Química básica II y su laboratorio"
    },
    {
      nombre: "Química básica I",
      detalles: "Correquisito laboratorio. Abre Química básica II y su laboratorio"
    }
    // Agrega los demás cursos...
  ],
  // Continúa con los demás semestres...
};

const container = document.getElementById("malla-container");

for (const semestre in malla) {
  const card = document.createElement("div");
  card.className = "semestre";

  const titulo = document.createElement("h2");
  titulo.textContent = semestre;
  card.appendChild(titulo);

  malla[semestre].forEach(curso => {
    const div = document.createElement("div");
    div.className = "curso";

    const nombre = document.createElement("div");
    nombre.className = "nombre";
    nombre.textContent = curso.nombre;

    div.appendChild(nombre);

    if (curso.detalles) {
      const detalle = document.createElement("div");
      detalle.className = "detalle";
      detalle.textContent = curso.detalles;
      div.appendChild(detalle);
    }

    card.appendChild(div);
  });

  container.appendChild(card);
}
