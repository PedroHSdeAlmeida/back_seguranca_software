import express from 'express';
import routes from './routes';
import { AppDataSource } from './config/database';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from './swagger.json';

const app = express();

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(routes);

AppDataSource.initialize()
  .then(() => {
    console.log('Conectado ao banco de dados.');
  })
  .catch((error) => console.log(error));

export default app;
