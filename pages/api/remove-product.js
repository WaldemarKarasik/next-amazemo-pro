import nextConnect from "next-connect";
import middleware from "../../db/middlewares";
const ObjectId = require("mongoose").Schema.Types.ObjectId;

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {
  const { id } = req.query;
  const deletedProduct = await req.product.findOneAndRemove({ _id: id });
  const category = await req.category.findOne({
    _id: deletedProduct.category._id,
  });
  // category.products.pull(deletedProduct._id);
  // console.log(category.products);
  // await category.save();
  await req.category.findByIdAndUpdate(
    deletedProduct.category._id,
    {
      pull: { products: { _id: new ObjectId(deletedProduct._id) } },
    },
    { new: true },
    async function (err, node) {
      // console.log(category);
      if (err) console.log(err);
      const categories = await req.category.find().populate("products");
      return res.json({ product: deletedProduct, categories });
    }
  );
});

export default handler;
