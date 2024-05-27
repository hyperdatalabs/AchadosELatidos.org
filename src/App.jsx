import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import Find from "./Find";
import Pet from "./Pet";
import { ErrorBoundary } from "react-error-boundary";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Routes>
        <Route index path="/find" element={<Find />} />
        <Route index path="/pet/:id" element={<Pet />} />
        <Route index path="*" element={<Home />} />
      </Routes>
      <ErrorBoundary
        fallback={
          <div>
            Ops... Infelizmente algo deu errado. Você não deveria estar vendo
            esta página. Você pode tentar atualizar a página. <br />
            Caso esteja ocorrendo com muita frequência, contate{" "}
            <a href="mailto:suporte@thinkaigroup.com">nosso suporte</a>.
          </div>
        }
      >
        <Outlet />
      </ErrorBoundary>
    </ThemeProvider>
  );
}
