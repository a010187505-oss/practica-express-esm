import express from 'express';
import pedidosRouter from './routes/pedidos.js';

const app = express();
app.use(express.json());

app.use('/api/pedidos', pedidosRouter);

app.listen(3000, () => {
  console.log('Servidor corriendo en el puerto 3000');
});