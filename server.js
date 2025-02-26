// import express from "express";
// import next from "next";

// const dev = process.env.NODE_ENV !== "production";
// const app = next({ dev });
// const handle = app.getRequestHandler();

// app.prepare().then(() => {
//   const server = express();

//   // Handle all routes with Next.js
//   server.all("*", (req, res) => {
//     return handle(req, res);
//   });

//   const port = process.env.PORT || 3000;
//   server.listen(port, (err) => {
//     if (err) throw err;
//     console.log(`> Ready on http://localhost:${port}`);
//   });
// });
import express from 'express'
import next from 'next'
import cors from 'cors' // Import cors

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  // Enable CORS
  server.use(
    cors({
      origin: 'http://localhost:3000', // Allow your frontend origin
      methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
      credentials: true // If you need to send cookies
    })
  )

  // Handle all routes with Next.js
  server.all('*', (req, res) => {
    return handle(req, res)
  })

  const port = process.env.PORT || 3000
  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
