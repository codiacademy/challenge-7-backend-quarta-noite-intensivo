import { app } from "./app";
const port = Number(process.env.PORT ?? 4000);
app.listen({ port, host: "0.0.0.0" }).then(() => {
  console.log(`Server running on http://localhost:${port}`);
});
