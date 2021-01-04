import "bootstrap/dist/css/bootstrap.css";
import buildClient from "../api/build-client";

const AppComponent = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

AppComponent.getInitialProps = () => {};

export default AppComponent;
