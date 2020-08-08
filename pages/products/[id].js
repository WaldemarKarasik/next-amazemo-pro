import Link from "next/link";
import { data } from "../../data";
import { wrapper } from "../../store/store";
import Axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { motion, useAnimation, useTransform } from "framer-motion";
import { useDeleteProduct, useAlreadyInCart } from "../../hooks";
import DetailsAction from "../../components/product[id]/DetailsAction";

// export const getServerSideProps = wrapper.getServerSideProps(
//   async ({ store, req, res, query }) => {
//   const { data } = await Axios.get(
//     `http://localhost:3000/api/product-details?id=${query.id}`
//   );
//   store.dispatch({ type: "PRODUCT_LOADED", payload: data });
// }
// );
export const getServerSideProps = async ({ req, res, query }) => {
  console.log(typeof window);
  const { data: product } = await Axios.get(
    `${process.env.BASE_URL}/api/product-details?id=${query.id}`
  );
  return { props: { product } };
};

const ProductScreen = ({ product }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const user = useSelector((state) => state.user.user);
  const alreadyInCart = useAlreadyInCart(cartItems, product);
  const [qty, setQty] = React.useState(1);
  const controls = useAnimation();
  const imageClickHanlder = () => {
    controls
      .start({
        x: 100,
      })
      .then(() => controls.start({ x: 0 }));
  };
  const handleAddToCart = () => {
    router.push({
      pathname: `/cart`,
      query: { id: product._id, qty },
    });
  };
  const deleteProduct = useDeleteProduct(dispatch, router);
  return (
    <main>
      <div>
        <Link href="/">
          <a>Назад</a>
        </Link>
      </div>
      <div className="details">
        <motion.div
          animate={controls}
          onClick={imageClickHanlder}
          className="details-image"
        >
          <img src={product.image} alt="product" />
        </motion.div>
        <div className="details-info">
          <ul>
            <li>
              <h4>{product.name}</h4>
            </li>
            <li>
              {product.rating} Звезд ({product.numReviews} Отызвов)
            </li>
            <li>
              Цена:<b> {product.price}&#8381;</b>
            </li>
            <li>
              Описание:
              <div>{product.description}</div>
            </li>
          </ul>
        </div>
        {/* <div className="details-action">
          <ul>
            <li>Цена: {product.price * qty}&#8381;</li>
            <li>
              Статус:{" "}
              <span
                className={`product__item__status__${
                  product.countInStock > 0 ? "available" : "unavailable"
                }`}
              >
                {product.countInStock > 0 ? "В наличии" : "Недоступно"}
              </span>
            </li>
            <li>
              Кол-во:{" "}
              {!alreadyInCart && (
                <select value={qty} onChange={(e) => setQty(e.target.value)}>
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              )}
            </li>
            <li>
              {product.countInStock > 0 && !alreadyInCart ? (
                <button className="button primary" onClick={handleAddToCart}>
                  Добавить в корзину
                </button>
              ) : alreadyInCart ? (
                <div className="product_item__out-of-stock">Уже в корзине</div>
              ) : (
                <div className="product_item__out-of-stock">Нет в наличии</div>
              )}

              {user.isAdmin && (
                <button onClick={() => deleteProduct(product._id)}>
                  Удалить
                </button>
              )}
            </li>
          </ul>
        </div> */}
        <DetailsAction
          product={product}
          qty={qty}
          setQty={setQty}
          alreadyInCart={alreadyInCart}
          deleteProduct={deleteProduct}
          handleAddToCart={handleAddToCart}
          user={user}
        />
      </div>
    </main>
  );
};

export default ProductScreen;
