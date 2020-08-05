import { Typography } from "antd";
import { useForm } from "react-hook-form";
import Axios from "axios";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { applySession } from "next-iron-session";
import { isEmpty } from "lodash";

const { Title } = Typography;
const SignIn = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const router = useRouter();

  // useEffect(() => {
  //   async function getUser() {
  //     const { data } = await Axios.get(`/api/auth/me`);
  //     console.log(data);
  //   }
  //   getUser();
  // }, []);

  const onSubmit = async (loginData) => {
    const { data } = await Axios.post("/api/auth/signin", loginData);
    if (data.ok) {
      dispatch({ type: "LOGIN_SUCCESS", payload: data.user });
      router.push("/cart");
    }
  };
  return (
    <div className="grid-wrapper">
      <div className="form-wrapper">
        <Title level={2}>Войдите в свой аккаунт</Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input ref={register} name="email" type="email" placeholder="Email" />
          <input ref={register} name="password" type="password" />
          <button type="submit">Войти</button>
        </form>
      </div>
      <div className="image-wrapper"></div>
    </div>
  );
};

export async function getServerSideProps(ctx) {
  await applySession(ctx.req, ctx.res, {
    password: process.env.SECRET_COOKIE_PASSWORD,
    cookieName: "amazemo-session",
  });
  if (!isEmpty(ctx.req.session.get("user"))) {
    ctx.res.writeHead("302", { Location: "/" });
    ctx.res.end();
    return { props: {} };
  }
  return { props: {} };
}
export default SignIn;
