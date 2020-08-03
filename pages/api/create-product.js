import nextConnect from "next-connect";
import middleware from "../../db/middlewares";

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {
  let productData = req.body;
  const product = new req.product(productData);
  try {
    const savedProduct = await product.save();
    const productWithCategory = await req.product
      .find({ _id: savedProduct._id })
      .populate("category");
    return res.status(201).json(productWithCategory);
  } catch (e) {
    return res.status(500).json(e);
  }
  console.log();
  return res.json("helo");
});

export default handler;
