// import { ironSession } from "next-iron-session";
import middleware from "../../../db/middlewares/index";
// const session = ironSession({
//   cookieName: "next-iron-session",
//   password: process.env.SECRET_COOKIE_PASSWORD,
//   // if your localhost is served on http:// then disable the secure flag
//   cookieOptions: {
//     secure: process.env.NODE_ENV === "production",
//   },
// });
import nextConnect from "next-connect";

const handler = nextConnect();

handler.use(middleware).post(async (req, res) => {
  const foundUser = await req.userModel.findOne({ email: req.body.email });
  if (foundUser && req.body.password === foundUser.password) {
    const secureUser = foundUser;
    secureUser.password = undefined;
    await req.session.set("user", secureUser);
    await req.session.save();
    return res.json(secureUser);
  }
});

export default handler;
