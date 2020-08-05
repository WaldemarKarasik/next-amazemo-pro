import nextConnect from "next-connect";
import middleware from "../../../db/middlewares";

const handler = nextConnect();

handler.use(middleware).get(async (req, res) => {
  const user = await req.session.get("user");
  if (user) {
    return res.json({ user, ok: true });
  } else {
    return res.json({ ok: false });
  }
});

export default handler;
