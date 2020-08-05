import nextConnect from "next-connect";
import database from "./database";
import { ironSession } from "next-iron-session";

const session = ironSession({
  cookieName: "amazemo-session",
  password: process.env.SECRET_COOKIE_PASSWORD,
  // if your localhost is served on http:// then disable the secure flag
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
});

const middleware = nextConnect();

middleware.use(database).use(session);

export default middleware;
