import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import Find from "./Find";
import Pet from "./Pet";
import { ErrorBoundary } from "react-error-boundary";
import Submit from "./Submit";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function fallbackRender({ error, resetErrorBoundary }) {
  // Call resetErrorBoundary() to reset the error boundary and retry the render.

  return (
    <div role="alert">
      <p>
        Oops! Algo deu errado. Você não deveria estar vendo esta página. Você
        pode tentar atualizar a página. <br />
        Caso esteja ocorrendo com muita frequência, contate{" "}
        <a
          href={encodeURI(
            "mailto:suporte@thinkaigroup.com?subject=Encontrei um bug no achadoselatidos.org&body=" +
              error.message
          )}
        >
          nosso suporte
        </a>.
      </p>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <ErrorBoundary fallbackRender={fallbackRender}>
        <Routes>
          <Route index path="/find" element={<Find />} />
          <Route index path="/submit" element={<Submit />} />
          <Route index path="/pet/:id" element={<Pet />} />
          <Route index path="*" element={<Home />} />
        </Routes>

        <Outlet />
      </ErrorBoundary>
    </ThemeProvider>
  );
}
