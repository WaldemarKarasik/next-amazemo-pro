import Axios from "axios";
import { Row, Col } from "antd";

export const getServerSideProps = async ({ query }) => {
  const normalizedQuery =
    query.name.charAt(0).toUpperCase() + query.name.slice(1);
  const { data: category } = await Axios.get(
    `${process.env.BASE_URL}/api/category?name=${normalizedQuery}`
  );
  return { props: { category } };
};

const Category = ({ category }) => {
  return (
    <Row style={{ marginTop: "3rem", maxWidth: "100vw" }} align="center">
      {category.products.map((product) => (
        <>
          <Col
            style={{
              display: "flex",
              border: "2px solid black",
              borderRadius: "10px",
              height: "20rem",
            }}
            md={6}
            xs={16}
          >
            {product.name}
          </Col>
          <Col
            style={{
              display: "flex",
              border: "2px solid black",
              borderRadius: "10px",
              height: "20rem",
            }}
            md={6}
            xs={16}
          >
            {product.name}
          </Col>
        </>
      ))}
    </Row>
  );
};

export default Category;
