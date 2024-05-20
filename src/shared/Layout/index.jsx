/* eslint-disable react/prop-types */
import { Container } from "@mui/material";
import Header from "../Header";

const Layout = (props) => <>
  <Header />
  <Container component="main" >
    {props.children}
  </Container>
</>

export default Layout;