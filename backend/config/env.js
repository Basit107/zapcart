import { config } from "dotenv";

config({path: `.env.${process.env.NODE_ENV || 'development' }.local`});

export const { PORT, DB_URI, SECRET_SAULT, NODE_ENV } = process.env;