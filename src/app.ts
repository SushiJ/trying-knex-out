import { config } from "dotenv";
config();
import { onDbConnect } from "./knex";

onDbConnect()
  .then(() => {
    console.log("DB connected");
  })
  .catch((e) => {
    console.log(`Failed to connect : ${e} `);
  });
