import express from 'express';
import routes from './routes';
import { AppDataSource } from './config/database';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from './swagger.json';
import cors from 'cors';

const app = express();

const corsOptions = {
  origin: `${process.env.FRONTEND_URL}${process.env.PORT_FRONT}`,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(routes);

AppDataSource.initialize()
  .then(() => {
    console.log('Conectado ao banco de dados.');
  })
  .catch((error) => console.log(error));

export default app;
