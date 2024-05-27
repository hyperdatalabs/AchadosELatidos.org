/* eslint-disable react/no-unknown-property */
import {
  Alert,
  Box,
  Button,
  Grid,
  IconButton,
  Link,
  Snackbar,
  Typography,
} from "@mui/material";
import Layout from "../shared/Layout";
import { Close, Instagram, WhatsApp } from "@mui/icons-material";
import { useEffect, useState } from "react";
import React from "react";
import { useLocation } from "react-router-dom";

const Home = () => {
  const [open, setOpen] = useState(false);
  const search = useLocation().search;
  let params = new URLSearchParams(search);
  const error = params.get("error", "Ops. Ocorreu um erro");

  useEffect(() => {
    if (error) {
      setOpen(true);
    }
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <Close fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  return (
    <div>
      <Layout>
        <Grid
          container
          id="cta"
          sx={{ my: 4, px: 2, border: "1px solid", borderRadius: "16px" }}
        >
          <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
            <Box
              component="img"
              sx={{ width: 325, textAlign: "center" }}
              md={{ display: "block", margin: "auto" }}
              src="https://storage.googleapis.com/assets-achadoselatidos/logo-nobg.png"
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Box sx={{ alignContent: "center", height: "100%" }}>
              <Typography
                variant="h1"
                sx={{
                  textAlign: "center",
                  wordWrap: "normal",
                  fontSize: "4rem",
                }}
                sm={{ fontSize: "6rem" }}
              >
                ACHADOS E LATIDOS
              </Typography>
              <Typography sx={{ textAlign: "center" }}>
                Reunimos corações perdidos, ajudando você a reencontrar seu
                amado animal de estimação.
              </Typography>
              <Grid
                container
                sx={{ my: 1, placeContent: "center" }}
                spacing={1}
              >
                <Grid item xs={12} md={6}>
                  <Link href="/find">
                    <Button fullWidth variant="contained">
                      QUERO ENCONTRAR MEU PET
                    </Button>
                  </Link>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Link href="https://wa.me/5521994814666">
                    <Button fullWidth variant="outlined">
                      QUERO FALAR SOBRE UM PET
                    </Button>
                  </Link>
                </Grid>
              </Grid>
              <Box sx={{ textAlign: "center" }}>
                <Button
                  sx={{ my: 2 }}
                  target="_blank"
                  component="a"
                  href="https://www.instagram.com/achadoselatidos"
                >
                  <Instagram />
                </Button>
                <Button
                  sx={{ my: 2 }}
                  target="_blank"
                  component="a"
                  href="https://wa.me/5521994814666"
                >
                  <WhatsApp />
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                textAlign: "center",
                alignContent: "center",
                height: "100%",
                padding: 2,
              }}
            >
              {/* <Box
              sx={{
                width: "100%",
                borderRadius: 2,
              }}
              component="img"
              loading="lazy"
              src="https://storage.googleapis.com/assets-achadoselatidos/dog-rescue.webp"
            /> */}
              <video
                width="100%"
                playsInline
                autoPlay
                loop
                muted
                style={{ borderRadius: "16px" }}
              >
                <source
                  src="https://storage.googleapis.com/assets-achadoselatidos/dog-rescue-animated.mp4"
                  type="video/mp4"
                />
              </video>
            </Box>
          </Grid>
          <Grid item xs={12} sx={{ my: 2, textAlign: "center", mb: 4 }} md={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
                p: 2,
              }}
            >
              <Typography>
                Na Achados e Latidos nossa maior motivação é o amor
                incondicional entre pessoas e seus animais de estimação.
                Utilizando a mais avançada tecnologia, trabalhamos
                incansavelmente para reunir lares e corações partidos, ajudando
                a encontrar animais perdidos e trazendo alegria de volta às
                famílias. Cada reencontro bem-sucedido nos inspira a continuar
                aprimorando nossas ferramentas e serviços, pois acreditamos que
                todo pet merece estar em casa, cercado de carinho e segurança.
                Nossa missão é clara: transformar a angústia da perda em
                momentos de felicidade e alívio, reafirmando diariamente nosso
                compromisso com o bem-estar animal e humano.
              </Typography>
              <Link href="#cta">
                <Button sx={{ my: 2 }} fullWidth variant="contained">
                  QUERO AJUDA/AJUDAR!!
                </Button>
              </Link>
            </Box>
          </Grid>
        </Grid>
        <Grid container sx={{ my: 2, mb: 4 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h2">Como funciona?</Typography>
            <Box>
              <Box sx={{ display: "flex", gap: "1rem", my: 2 }}>
                <Box
                  sx={{
                    width: "2rem",
                    height: "2rem",
                    backgroundColor: "primary.main",
                    color: "#121212",
                    borderRadius: "100%",
                    alignContent: "center",
                    textAlign: "center",
                  }}
                >
                  1
                </Box>{" "}
                <Typography sx={{ alignContent: "center", flex: 1 }}>
                  Siga nosso perfil no Instagram{" "}
                  <Link
                    target="__blank"
                    href="https://www.instagram.com/achadoselatidos"
                  >
                    @achadoselatidos
                  </Link>
                  .
                </Typography>
              </Box>
              <Box sx={{ display: "flex", gap: "1rem", my: 2 }}>
                <Box
                  sx={{
                    width: "2rem",
                    height: "2rem",
                    backgroundColor: "primary.main",
                    color: "#121212",
                    borderRadius: "100%",
                    alignContent: "center",
                    textAlign: "center",
                  }}
                >
                  2
                </Box>{" "}
                <Typography sx={{ alignContent: "center", flex: 1 }}>
                  Envie uma mensagem direta com informações detalhadas sobre seu
                  animal perdido, incluindo fotos recentes e localização onde
                  foi visto pela última vez.
                </Typography>
              </Box>
              <Box sx={{ display: "flex", gap: "1rem", my: 2 }}>
                <Box
                  sx={{
                    width: "2rem",
                    height: "2rem",
                    backgroundColor: "primary.main",
                    color: "#121212",
                    borderRadius: "100%",
                    alignContent: "center",
                    textAlign: "center",
                  }}
                >
                  3
                </Box>{" "}
                <Typography sx={{ alignContent: "center", flex: 1 }}>
                  Nossa equipe analisará as informações e publicará no perfil e
                  página, ampliando o alcance da busca com a ajuda da nossa
                  comunidade ativa.
                </Typography>
              </Box>
              <Box sx={{ display: "flex", gap: "1rem", my: 2 }}>
                <Box
                  sx={{
                    width: "2rem",
                    height: "2rem",
                    backgroundColor: "primary.main",
                    color: "#121212",
                    borderRadius: "100%",
                    alignContent: "center",
                    textAlign: "center",
                  }}
                >
                  4
                </Box>
                <Typography sx={{ alignContent: "center", flex: 1 }}>
                  Receba notificações e mensagens de possíveis avistamentos
                  diretamente no Instagram ou contato telefônico, conectando
                  você rapidamente com quem pode ter visto seu pet.
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sx={{ my: 2, textAlign: "center" }} md={6}>
            <Box sx={{ textAlign: "center", height: "100%", padding: 2 }}>
              <video
                width="100%"
                playsInline
                autoPlay
                muted
                loop
                style={{ borderRadius: "16px" }}
              >
                <source
                  src="https://storage.googleapis.com/assets-achadoselatidos/cat-animated.mp4"
                  type="video/mp4"
                />
              </video>
            </Box>
          </Grid>
        </Grid>
        <Grid container sx={{ my: 2 }}>
          <Grid item xs={4}>
            <Box
              component="img"
              sx={{
                maxWidth: "100%",
                my: 2,
                width: "400px",
                height: "400px",
                objectFit: "cover",
              }}
              loading="lazy"
              src="https://storage.googleapis.com/assets-achadoselatidos/home1.jpg"
            />
          </Grid>
          <Grid item xs={4}>
            <Box
              component="img"
              sx={{
                maxWidth: "100%",
                my: 2,
                width: "400px",
                height: "400px",
                objectFit: "cover",
              }}
              loading="lazy"
              src="https://storage.googleapis.com/assets-achadoselatidos/home2.jpg"
            />
          </Grid>
          <Grid item xs={4}>
            <Box
              component="img"
              sx={{
                maxWidth: "100%",
                my: 2,
                width: "400px",
                height: "400px",
                objectFit: "cover",
              }}
              loading="lazy"
              src="https://storage.googleapis.com/assets-achadoselatidos/home3.jpg"
            />
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ my: 2, textAlign: "center" }} md={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
              mt: 2,
            }}
          >
            <Typography variant="h2">TORNE-SE A DIFERENÇA</Typography>
            <Typography sx={{ my: 4 }}>
              Seja um herói na vida de um animal perdido! Participe da nossa
              comunidade compartilhando posts, fornecendo dicas, ou se
              voluntariando para ajudar na busca. Cada gesto conta para trazer
              alegria de volta a um lar.
            </Typography>
            <Link href="#cta">
              <Button sx={{ my: 2 }} variant="contained">
                EU QUERO AJUDAR!
              </Button>
            </Link>
          </Box>
        </Grid>
      </Layout>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={6000}
        onClose={handleClose}
        severity="error"
      >
        <Alert onClose={handleClose} severity="error" variant="filled">
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Home;
