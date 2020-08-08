import Link from "next/link";
import { useSelector } from "react-redux";
import { Drawer, Typography, Badge } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";

export default function HeaderAndAside() {
  const asideRef = React.useRef();
  const router = useRouter();
  // const cartItems = useSelector((state) => state.cart.cartItems);
  const [visible, setVisible] = React.useState(false);
  const categories = useSelector((state) => state.categories.categories);

  // console.log(categories);
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
        title="Выбрать категорию"
        placement="left"
        closable={true}
        onClose={() => setVisible(false)}
        visible={visible}
        closeIcon={<CloseOutlined className="drawer__close-icon" />}
      >
        <div className="categories-list__wrapper">
          <ul className="categories-list__ul">
            {categories.map((category) => (
              <li key={category.name} className="categories-list__item">
                <Link
                  href="/category/[name]"
                  as={`/category/${category.name.toLowerCase()}`}
                >
                  <a>
                    <Badge
                      count={Object.keys(category.products).length}
                      showZero
                    >
                      <Typography.Title level={4}>
                        {category.name}
                      </Typography.Title>
                    </Badge>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Drawer>
    </>
  );
}
