import { wrapper } from "../store/store";
import "../styles/global.css";
import HeaderAndAside from "../components/HeaderAndAside";
import Footer from "../components/Footer";
import "antd/dist/antd.css";
import "../styles/index.scss";

const WrappedApp = ({ Component, pageProps }) => {
  return (
    <div className="grid-container">
      <HeaderAndAside />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
};

// export const getServerSideProps = async () => {};
export default wrapper.withRedux(WrappedApp);

// import React from "react";
// import App from "next/app";

// class MyApp extends App {
//   static getInitialProps = async ({ Component, ctx }) => {
//     ctx.store.dispatch({ type: "TOE", payload: "was set in _app" });
//     const session = await getSession(ctx);
//     // console.log(session);
//     /* ... */

//     return {
//       pageProps: {
//         // Call page-level getInitialProps
//         session,
//         ...(Component.getServerSideProps
//           ? await Component.getServerSideProps(ctx)
//           : {}),
//         // Some custom thing for all pages
//       },
//     };
//   };

//   render() {
//     const { Component, pageProps } = this.props;

//     return (
//       <div className="grid-container">
//         <Provider session={pageProps.session}>
//           <HeaderAndAside />
//           <Component {...pageProps} />
//           <Footer />
//         </Provider>
//       </div>
//     );
//   }
// }

// export default wrapper.withRedux(MyApp);
