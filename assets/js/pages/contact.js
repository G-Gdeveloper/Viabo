const botonEnlace = document.getElementById('submit_btn');
const formulario = document.getElementById('contact_form');

botonEnlace.addEventListener('click', async (event) => {
    //e.preventDefault();
    //alert("entre")
    //console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB")
    // 1. Validar antes de empaquetar
    if (!formulario.checkValidity()) {
        formulario.reportValidity();
        //alert("paileishon")
        console.log("AAAAAAAAAAAAAAAAAAAAAAA")
        return; // Detiene la ejecución si hay errores
    }

    // 2. Empaquetar los datos
    const datosRaw = new FormData(formulario);
    const datosJson = Object.fromEntries(datosRaw.entries());

    //alert(JSON.stringify(datosJson))

    // 3. Enviar vía Fetch
    try {
        const respuesta = await fetch('https://formspree.io/f/', {
            method: 'POST',
            body: JSON.stringify(datosJson),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        if (respuesta.ok) {
            alert('¡Mensaje enviado con éxito!');
            formulario.reset(); // Limpia los campos
        } else {
            alert('Hubo un error al enviar.');
        }
    } catch (error) {
        console.error('Error de red:', error);
    }
});