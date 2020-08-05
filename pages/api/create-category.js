// import nextConnect from "next-connect";
// import middleware from "../../db/middlewares";

// const handler = nextConnect();

// handler.use(middleware);

// handler.post(async (req, res) => {
//   const category = new req.category({ name: req.body.name });
//   try {
//     const savedCategory = await category.save();
//     return res.status(201).json(savedCategory);
//   } catch (e) {
//     return res.status(500).json(e);
//   }
// });

// export default handler;
