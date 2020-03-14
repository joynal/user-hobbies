import app from './config/express';
import dbConnect from './config/database';
import { port, env } from './config/vars';

dbConnect();

// listen to requests
app.listen(port, () => {
    console.log(`🌏 server started at http://localhost:${port} (${env})`);

    if (env === 'development') {
        console.log(`⚙️  Swagger UI hosted at http://localhost:${port}/docs`);
    }
});

export default app;