import Link from "next/link";
import { useSelector } from "react-redux";
import { Drawer } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";

export default function HeaderAndAside() {
  const asideRef = React.useRef();
  const router = useRouter();
  // const cartItems = useSelector((state) => state.cart.cartItems);
  const [visible, setVisible] = React.useState(false);
  // console.log(session);
  // const openMenu = () => {
  //   asideRef.current.classList.add("open");
  // };
  // const closeMenu = () => {
  //   asideRef.current.classList.remove("open");
  // };

  React.useEffect(() => {
    // async function checkMe() {
    //   const { data } = await Axios.get(`/api/auth/me`);
    // }
    // checkMe();
  }, []);

  return (
    <>
      <header className="header">
        <div
          className="brand"
          style={{ display: "flex", alignItems: "center" }}
        >
          <div>
            <button className="hamburger" onClick={() => setVisible(true)}>
              &#9776;
            </button>
          </div>
          <Link href="/">
            <a>Amazemo</a>
          </Link>
        </div>
        <div className="header-links">
          <Link href="/cart">
            <a className="header-links__cart">
              <span>Корзина </span>
              {/* <span className="header-links__cart__badge">
                {cartItems.length ? cartItems.length : null}
              </span> */}
            </a>
          </Link>

          <Link href="/auth/signin">
            <a>Войти</a>
          </Link>
        </div>
      </header>
      {/* <aside ref={asideRef} className="sidebar">
        <button className="sidebar-close-button" onClick={closeMenu}>
          &times;
        </button>
        <ul>
          <li>
            <a href="#">Pants</a>
          </li>
          <li>
            <a href="#">Shirts</a>
          </li>
        </ul>
      </aside> */}
      <Drawer
        title="Categories"
        placement="left"
        closable={true}
        onClose={() => setVisible(false)}
        visible={visible}
        closeIcon={<CloseOutlined className="drawer__close-icon" />}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
}
