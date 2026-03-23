import dotenv from "dotenv";

import { createApp } from "./app";

dotenv.config();

const PORT = Number(process.env.PORT || 4000);

const app = createApp();

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`kodemy-backend listening on http://localhost:${PORT}`);
});

