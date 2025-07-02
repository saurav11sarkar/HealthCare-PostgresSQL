import { Server } from "http";
import app from "./app";

const post = 3000;

async function main() {
  try {
    const server: Server = app.listen(post, () => {
      console.log(`Server is running on http://localhost:${post}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

main();
