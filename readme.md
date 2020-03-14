## Setup & start services (Without docker):

1.  Install npm packages:

```bash
npm i
```

2. Setup environment variables:

Copy `.env.example` to `.env` and replace `.env` configurations with yours.

3. Build server
```bash
npm run build
```

4. Start server
```bash
npm run start
```

Running the above commands results in 
* **API Server** running at `http://localhost:3000`
* **Swagger UI** is at `http://localhost:3000/docs`

5. Seed sample data
```bash
node dist/src/seed/run.js
```

6. Run tests
```bash
npm run test
```

## Setup & start services (With docker):

1. Setup environment variables:

Copy `.env.example` to `.env` and replace `.env` configurations with yours.

2. Run with docker
```bash
docker-compose up
```
