import axios from "axios";

const LandingPage = ({ currentUser }) => {
  console.log(currentUser);
  return <h1>Landing Page</h1>;
};

LandingPage.getInitialProps = async ({ req }) => {
  if (typeof window === "undefined") {
    // we are on the server
    // request should be made to http://ingressnginx...
    const { data } = await axios.get(
      "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser",
      {
        headers: req.headers,
      }
    );
    console.log(data);
    return data;
  } else {
    // we are on the browser
    // request can be made with a base url of ''
    const { data } = await axios.get("/api/users/currentuser");
    return data;
  }
};

export default LandingPage;
