import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SECRET_KEY;

console.log("Supabase URL:", url);
console.log("Supabase key loaded:", !!key);

if (!url) {
  throw new Error("SUPABASE_URL is missing");
}

if (!key) {
  throw new Error("SUPABASE_SECRET_KEY is missing");
}

export const supabase = createClient(url, key);