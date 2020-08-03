import Link from "next/link";
import { useSelector } from "react-redux";
export default function HeaderAndAside() {
  const asideRef = React.useRef();
  // const cartItems = useSelector((state) => state.cart.cartItems);

  const openMenu = () => {
    asideRef.current.classList.add("open");
  };
  const closeMenu = () => {
    asideRef.current.classList.remove("open");
  };

  React.useEffect(() => {
    document.addEventListener("click", function (e) {
      if (
        !asideRef.current.contains(e.target) &&
        !e.target.classList.contains("hamburger")
      ) {
        closeMenu();
      }
    });
  }, []);

  return (
    <>
      <header className="header">
        <div
          className="brand"
          style={{ display: "flex", alignItems: "center" }}
        >
          <div>
            <button className="hamburger" onClick={openMenu}>
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
          <Link href="/signin">
            <a>Войти</a>
          </Link>
        </div>
      </header>
      <aside ref={asideRef} className="sidebar">
        {/* <h3>Shopping Categories</h3> */}
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
      </aside>
    </>
  );
}
