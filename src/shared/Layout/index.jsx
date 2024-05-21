/* eslint-disable react/prop-types */
import { Container } from "@mui/material";
import Header from "../Header";
import Footer from "../Footer";

const Layout = (props) => (
  <>
    <Header />
    <Container component="main">
      {props.children}
      <Footer />
    </Container>
  </>
);

export default Layout;
