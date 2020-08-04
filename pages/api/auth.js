import nextConnect from "next-connect";
import middleware from "../../db/middlewares";

const handler = nextConnect();

handler.use(middleware);

handler.get((req, res) => {
  res.writeHead(302, { Location: "/cart" });
  res.end();
});

export default handler;
