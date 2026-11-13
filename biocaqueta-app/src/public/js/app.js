// Panel lateral de registro y confirmación antes de eliminar
const panel = document.getElementById('registrar');

if (panel) {
    document.querySelectorAll('[data-abrir-registro]').forEach((boton) => {
        boton.addEventListener('click', (evento) => {
            evento.preventDefault();
            panel.showModal();
            panel.querySelector('input')?.focus();
        });
    });

    panel.querySelector('[data-cerrar]').addEventListener('click', () => panel.close());

    // Cerrar al hacer clic fuera del panel
    panel.addEventListener('click', (evento) => {
        if (evento.target === panel) panel.close();
    });

    // Abrir directamente cuando se llega desde otra página con /#registrar
    if (location.hash === '#registrar') panel.showModal();
}

document.querySelectorAll('form[data-confirmar]').forEach((formulario) => {
    formulario.addEventListener('submit', (evento) => {
        if (!confirm(formulario.dataset.confirmar)) evento.preventDefault();
    });
});
