import { data } from "../../data";
import nextConnect from "next-connect";
import middleware from "../../db/middlewares";

const handler = nextConnect();

handler.use(middleware).get(async (req, res) => {
  if (req.query.id) {
    // const product = data.products.find((x) => x._id == req.query.id);
    const product = await req.product.findOne({ _id: req.query.id }).lean();
    if (product) {
      return res.json(product);
    }
  }
  const products = await req.product
    .find()
    .populate({ path: "category", populate: { path: "products" } })
    .lean();
  return res.json(products);
});
export default handler;
