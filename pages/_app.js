import { wrapper } from "../store/store";
import "../styles/global.css";
import HeaderAndAside from "../components/HeaderAndAside";
import Footer from "../components/Footer";
import "antd/dist/antd.css";
import "../styles/index.scss";
import App from "next/app";

// const WrappedApp = ({ Component, pageProps }) => {
//   return (
//     <div className="grid-container">
//       <HeaderAndAside />
//       <Component {...pageProps} />
//       <Footer />
//     </div>
//   );
// };

// WrappedApp.getInitialProps = async (ctx) => {
//   console.log(ctx.req)
//   return {
//     pageProps: {
//       // Call page-level getInitialProps
//       ...(App.getServerSideProps ? await App.getInitialProps(ctx) : {}),
//       // Some custom thing for all pages
//     },
//   };
// };

// // export const getServerSideProps = async () => {};
// export default wrapper.withRedux(WrappedApp);

// import React from "react";
// import App from "next/app";

class MyApp extends App {
  static getInitialProps = async ({ Component, ctx }) => {
    // console.log(session);
    /* ... */
    // const { data } = await Axios.get(`${process.env.BASE_URL}/api/products`);
    return {
      pageProps: {
        // Call page-level getInitialProps
        ...(Component.getInitialProps
          ? await Component.getInitialProps(ctx)
          : {}),
        // Some custom thing for all pages
      },
    };
  };

  render() {
    const { Component, pageProps } = this.props;

    return (
      <div className="grid-container">
        <HeaderAndAside />
        <Component {...pageProps} />
        <Footer />
      </div>
    );
  }
}

export default wrapper.withRedux(MyApp);
