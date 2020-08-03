import { wrapper } from "../store/store";
import "../styles/global.css";
import HeaderAndAside from "../components/HeaderAndAside";
import Footer from "../components/Footer";

const WrappedApp = ({ Component, pageProps }) => {
  return (
    <div className="grid-container">
      <HeaderAndAside />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
};

export default wrapper.withRedux(WrappedApp);
