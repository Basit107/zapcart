import cookieParser from "cookie-parser";

const cookieConfig = (app) => {
    // Use cookie-parser middleware to parse cookies
    app.use(cookieParser());
};

export default cookieConfig;