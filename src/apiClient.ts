import { treaty } from "@elysiajs/eden";
import type { App } from "../../backend/src/index";

// @ts-ignore
const client = treaty<App>("localhost:3000");
