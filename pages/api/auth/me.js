import { ironSession } from "next-iron-session";
import middleware from "../../../db/middlewares/index";

import nextConnect from "next-connect";

const handler = nextConnect();

handler.use(middleware).get(async (req, res) => {
  const user = req.session.get("user");
  res.json(user);
});

export default handler;
