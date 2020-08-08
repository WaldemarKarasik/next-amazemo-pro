export default ({
  user,
  product,
  alreadyInCart,
  qty,
  setQty,
  deleteProduct,
  handleAddToCart,
}) => {
  return (
    <div className="details-action">
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
            <button onClick={() => deleteProduct(product._id)}>Удалить</button>
          )}
        </li>
      </ul>
    </div>
  );
};
