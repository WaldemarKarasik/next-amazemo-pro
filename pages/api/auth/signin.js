import nextConnect from "next-connect";
import middleware from "../../../db/middlewares/index";
const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {
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
