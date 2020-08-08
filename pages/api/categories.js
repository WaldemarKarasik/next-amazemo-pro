import nextConnect from "next-connect";
import middleware from "../../db/middlewares";

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  const categories = await req.category.find().populate("products").lean();
  return res.json(categories);
});

export default handler;
