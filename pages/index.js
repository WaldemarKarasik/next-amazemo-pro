import { useSelector, useDispatch } from "react-redux";
import Axios from "axios";
import Link from "next/link";
import { wrapper } from "../store/store";
import { useRouter } from "next/router";
import { useEffect } from "react";
import withSession from "../hoc/withSession";
import { withIronSession, applySession } from "next-iron-session";
import { isEmpty } from "lodash";
const Home = ({ session }) => {
  const router = useRouter();
  // const products = [...data];
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  useEffect(() => {
    // async function signIn() {
    //   const { data: UserData } = await Axios.post(`/api/auth/signin`, {
    //     email: "gachimuchi@gmail.com",
    //     password: "rootroot",
    //   });
    //   console.log(UserData);
    // }
    // async function checkMe() {
    //   const { data } = await Axios.get(`/api/auth/me`);
    //   console.log(data);
    // }
    // // signIn();
    // checkMe();
  }, []);
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
    // const { data: UserData } = await Axios.post(
    //   `${process.env.BASE_URL}/api/auth/signin`,
    //   {
    //     email: "gachimuchi@gmail.com",
    //     password: "rootroot",
    //   }
    // );
    // const { data: userResponse } = await Axios.get(
    //   `${process.env.BASE_URL}/api/auth/me`
    // );
    if (!isEmpty(ctx.req.session.get("user"))) {
      ctx.store.dispatch({
        type: "LOGIN_USER",
        payload: ctx.req.session.get("user"),
      });
    }
    ctx.store.dispatch({ type: "PRODUCTS_LOADED", payload: data });
  }),
  {
    password: process.env.SECRET_COOKIE_PASSWORD,
    cookieName: "amazemo-session",
  }
);
// export const getServerSideProps = async function ({ req, res }) {
//   // const user = req.session.get("user");
//   await applySession(req, res, {
//     password: process.env.SECRET_COOKIE_PASSWORD,
//     cookieName: "amazemo-session",
//   });
//   console.log(req.session.get());
//   return {
//     props: { user: {} },
//   };
// };

export default Home;
