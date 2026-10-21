import { Router } from 'express';

const router = Router();

router.get('/total/:cantidad/:precio', (req, res) => {
  const cantidad = Number(req.params.cantidad);
  const precio = Number(req.params.precio);
  if (isNaN(cantidad) || isNaN(precio)) {
    return res.status(400).json({ error: 'Cantidad y precio deben ser números' });
  }
  const subtotal = cantidad * precio;
  const iva = subtotal * 0.16;
  const total = subtotal + iva;
  res.json({ subtotal, iva, total });
});

// Ejercicio 1: Endpoint de Descuento
router.get('/descuento/:compra/:codigo', (req, res) => {
    let compra = Number(req.params.compra);
    const codigo = req.params.codigo;
    let descuentoAplicado = 0;

    if (codigo === 'VERANO10') {
        descuentoAplicado = 10;
    } else if (codigo === 'MITAD') {
        descuentoAplicado = 50;
    } else {
        return res.status(400).json({ error: 'Código inválido' });
    }

    let montoFinal = compra * (1 - (descuentoAplicado / 100));

    if (montoFinal > 1000) {
        montoFinal = montoFinal * 0.95; 
    }

    const respuestaJson = JSON.stringify({ codigo, descuentoAplicado, montoFinal });
    res.send(btoa(respuestaJson));
});

// Ejercicio 2: Endpoint de Promedio con Promesas
router.post('/promedio', (req, res) => {
    const { calificaciones } = req.body;

    if (!Array.isArray(calificaciones) || calificaciones.length < 3) {
        return res.status(400).json({ error: 'Debe ser un arreglo con al menos 3 elementos' });
    }

    new Promise((resolve) => {
        const suma = calificaciones.reduce((acc, curr) => acc + curr, 0);
        const promedio = (suma / calificaciones.length).toFixed(2);
        let nivel = '';

        if (promedio >= 8) nivel = 'excelente';
        else if (promedio >= 6) nivel = 'aceptable';
        else nivel = 'reprobado';

        resolve({ promedio: Number(promedio), nivel });
    })
    .then(resultado => res.json(resultado))
    .catch(() => res.status(500).json({ error: 'Error procesando los datos' }));
});

export default router;