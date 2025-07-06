import { Server } from "http";
import app from "./app";
import configs from "./configs";

const port = configs.path;

async function main() {
  try {
    const server: Server = app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

main();
