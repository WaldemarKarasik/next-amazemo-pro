import { useSelector, useDispatch } from "react-redux";
import Axios from "axios";
import Link from "next/link";
import { wrapper } from "../store/store";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { withIronSession, applySession } from "next-iron-session";
import { isEmpty } from "lodash";
const Home = ({ session }) => {
  const router = useRouter();
  // const products = [...data];
  const products = useSelector((state) => state.products.products);
  return (
    <main className="main">
      <div className="content">
        <ul className="products">
          {products.length
            ? products.map((product) => (
                <li key={product._id}>
                  <div className="product">
                    <div className="product__image__container">
                      <img
                        onClick={() =>
                          router.push(
                            "/products/[id]",
                            `/products/${product._id}`
                          )
                        }
                        className="product-image"
                        src={product.image}
                        alt="product"
                      />
                    </div>
                    <div className="product__info__container">
                      <div className="product-name">
                        <Link
                          href="/products/[id]"
                          as={`/products/${product._id}`}
                        >
                          <a>{product.name}</a>
                        </Link>
                      </div>
                      <div className="product-brand">{product.brand}</div>
                      <div className="product-price">
                        {product.price}&#8381;
                      </div>
                      <div className="product-rating">
                        {product.rating} Stars ({product.numReviews})
                      </div>
                    </div>
                    <div className="product__action">
                      <div>
                        <button className="button primary">Купить</button>
                      </div>
                    </div>
                  </div>
                </li>
              ))
            : null}
        </ul>
      </div>
    </main>
  );
};

// export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
//   store.dispatch(serverRenderClock(true))
//   store.dispatch(addCount())
// })

export const getServerSideProps = withIronSession(
  wrapper.getServerSideProps(async (ctx) => {
    const { data } = await Axios.get(`${process.env.BASE_URL}/api/products`);
    if (!isEmpty(ctx.req.session.get("user"))) {
      ctx.store.dispatch({
        type: "LOGIN_USER",
        payload: ctx.req.session.get("user"),
      });
    }
    const { data: categories } = await Axios.get(
      `${process.env.BASE_URL}/api/categories`
    );
    ctx.store.dispatch({ type: "PRODUCTS_LOADED", payload: data });
    ctx.store.dispatch({ type: "SET_CATEGORIES", payload: categories });
  }),
  {
    password: process.env.SECRET_COOKIE_PASSWORD,
    cookieName: "amazemo-session",
  }
);

export default Home;
