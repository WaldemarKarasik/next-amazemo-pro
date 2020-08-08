import nextConnect from "next-connect";
import middleware from "../../db/middlewares";

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  const { name } = req.query;
  if (name) {
    const category = await req.category.findOne({ name }).populate("products");
    return res.json(category);
  }
  res.json({});
});

export default handler;
