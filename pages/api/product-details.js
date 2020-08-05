import { data } from "../../data";
import nextConnect from "next-connect";
import middleware from "../../db/middlewares";

const handler = nextConnect();

handler.use(middleware).get(async (req, res) => {
  const { id } = req.query;

  const product = await req.product.findOne({ _id: id }).lean();
  res.json(product);
});
export default handler;
