import nextConnect from "next-connect";
import middleware from "../../db/middlewares";

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {
  let productData = req.body;
  const product = new req.product(productData);
  try {
    const productCategory = await req.category.findOne({
      _id: req.body.category,
    });
    const savedProduct = await product.save();
    productCategory.products.push(savedProduct._id);

    await productCategory.save();
    const productWithCategory = await req.product
      .findOne({ _id: product._id })
      .populate({ path: "category", populate: { path: "products" } });
    return res.status(201).json(productWithCategory);
  } catch (e) {
    return res.status(500).json(e);
  }
});

export default handler;
