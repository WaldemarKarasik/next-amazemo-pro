import nextConnect from "next-connect";
import database from "./database";
import { ironSession } from "next-iron-session";

const middleware = nextConnect();
const session = ironSession({
  cookieName: "next-iron-session",
  password: process.env.SECRET_COOKIE_PASSWORD,
  // if your localhost is served on http:// then disable the secure flag
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
});
middleware.use(database).use(session);

export default middleware;
