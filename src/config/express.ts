import express from 'express';
import morgan from 'morgan';
import compress from 'compression';
import methodOverride from 'method-override';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';

import routes from '../routes';
import * as error from '../utils/error';
import { logs, env } from './vars';
import apiSpec from '../../docs/api.json';

const app = express();

const swaggerUiOptions = {
    customCss: '.swagger-ui .topbar { display: none }'
};

if (env === 'development') {
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(apiSpec, swaggerUiOptions));
}

// request logging. dev: console | production: file
app.use(morgan(logs));

// parse body params and attache them to req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// gzip compression
app.use(compress());

// lets you use HTTP verbs such as PUT or DELETE
// in places where the client doesn't support it
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// mount api v1 routes
app.use('/api/v1', routes);

// catch 404 and forward to error handler
app.use(error.notFound);

// error handler, send stacktrace only during development
app.use(error.handler);

export default app;
