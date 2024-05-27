/* eslint-disable react/prop-types */
import {
  ExpandMore,
  Facebook,
  Info,
  LinkedIn,
  Mail,
  Pinterest,
  Reddit,
  Share,
  Telegram,
  Twitter,
  Warning,
  WhatsApp,
} from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Breadcrumbs,
  Button,
  Container,
  Link,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import Layout from "../shared/Layout";
import PetsService from "../shared/services/pets";

const PetBreadcrumbs = ({ petType }) => (
  <Breadcrumbs aria-label="breadcrumb">
    <Link underline="hover" href="/">
      Início
    </Link>
    <Link underline="hover" href="/find">
      Animais
    </Link>
    <Typography>{petType}</Typography>
  </Breadcrumbs>
);

const Pet = () => {
  const { id } = useParams();
  const [pet, setPet] = useState({});
  const navigate = useNavigate();
  const SHARE_URL = "https://github.com";

  useEffect(() => {
    const getPetFromService = async (id) => {
      try {
        const petsResponse = (await PetsService.getPet({ _id: id }))["data"][
          "data"
        ][0];
        setPet(petsResponse);
      } catch {
        navigate(encodeURI("/?error=Pet infelizmente não encontrado"));
      }
    };
    getPetFromService(id);
  }, []);

  const handleShare = () => {
    navigator.share({
      text: `Olá, eu estou tentando apoiar compartilhando este cãozinho. Ele está disponível em: ${window.location.href}`,
    });
  };

  return (
    <Layout>
      {pet && pet["attributes"] && (
        <Container sx={{ my: 4 }}>
          <PetBreadcrumbs
            petType={pet && pet["attributes"] && pet["attributes"]["tipo"]}
          />
          <Box sx={{ textAlign: "center", my: 2 }}>
            <Box
              component="img"
              sx={{ maxWidth: "100%", my: 2 }}
              loading="lazy"
              src={
                pet["attributes"]["foto"]["data"][0]["attributes"].gcs_foto_url
              }
            />
          </Box>
          <Box sx={{ textAlign: "center", my: 2 }}>
            <Button
              onClick={handleShare}
              startIcon={<Share />}
              variant="outlined"
            >
              Compartilhe e ajude-o à alcançar mais pessoas
            </Button>
          </Box>
          <Box sx={{ textAlign: "center", my: 1 }}>
            <EmailShareButton
              url={window.location.href}
              subject="AchadosELatidos.org - Encontrei um animal que deve ser de seu interesse"
              body="Oi, estou tentando apoiar o achadoselatidos.org. Encontrei este animalzinho e gostaria que você desse uma olhada!!"
            >
              <Mail />
            </EmailShareButton>
            <FacebookShareButton
              url={window.location.href}
              hashtag="achadoselatidos"
            >
              <Facebook />
            </FacebookShareButton>
            <LinkedinShareButton
              title="AchadosELatidos.org - Encontrei um animalzinho!!"
              url={window.location.href}
              summary="A achadoselatidos.org é um site que ajuda pessoas à encontrar seus animais queridos. Estou apoiando eles e te encaminho este animal para você visualizar"
              source={window.location.href}
            >
              <LinkedIn />
            </LinkedinShareButton>
            <PinterestShareButton
              media={
                pet["attributes"] &&
                pet["attributes"]["foto"]["data"][0]["attributes"].gcs_foto_url
              }
              url={window.location.href}
              description="A achadoselatidos.org é um site que ajuda pessoas à encontrar seus animais queridos. Estou apoiando eles e te encaminho este animal para você visualizar"
            >
              <Pinterest />
            </PinterestShareButton>
            <RedditShareButton
              url={window.location.href}
              title={window.location.href}
            >
              <Reddit />
            </RedditShareButton>
            <TelegramShareButton
              url={window.location.href}
              title={window.location.href}
            >
              <Telegram />
            </TelegramShareButton>
            <TwitterShareButton
              title="Encontrei um animalzinho no achadoselatidos.org"
              hashtags={["#achadoselatidos"]}
              url={window.location.href}
            >
              <Twitter />
            </TwitterShareButton>
            <WhatsappShareButton
              url={SHARE_URL}
              title="Encontrei um animalzinho no achadoselatidos.org"
            >
              <WhatsApp />
            </WhatsappShareButton>
          </Box>
          <Box
            sx={{
              my: 4,
              borderRadius: 1,
              border: null,
              padding: 1,
            }}
          >
            {/* {JSON.stringify(pet)} */}
            <Typography>
              {pet && pet["attributes"] && pet["attributes"]["tipo"]},{" "}
              {pet && pet["attributes"] && pet["attributes"]["faixaEtaria"]},{" "}
              porte {pet && pet["attributes"] && pet["attributes"]["porte"]},{" "}
              {pet && pet["attributes"] && pet["attributes"]["sexo"]},{" "}
              {pet && pet["attributes"] && pet["attributes"]["observacao"]}
            </Typography>
          </Box>
          {pet["attributes"]["abrigo"] &&
            pet["attributes"]["abrigo"]["data"] != null && (
              <Alert icon={<Info fontSize="inherit" />} severity="info">
                Este animal está abrigado em{" "}
                {pet["attributes"] &&
                  pet["attributes"]["abrigo"]["data"]["attributes"]["Nome"]}
                {pet["attributes"] &&
                  pet["attributes"]["abrigo"]["data"]["attributes"][
                    "instagramUrl"
                  ]}
              </Alert>
            )}
          {(!pet["attributes"]["abrigo"] ||
            pet["attributes"]["abrigo"]["data"]) && (
            <Alert icon={<Warning fontSize="inherit" />} severity="error">
              Este animal <b>não</b> está abrigado e precisa de um abrigo!
            </Alert>
          )}
          <Box sx={{ my: 2 }}>
            <Accordion defaultExpanded>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography>Mais informações</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>Nome: {pet["attributes"]["nome"]}</Typography>
                <Typography>
                  Contato: {pet["attributes"]["nomeContato"]} (
                  {pet["attributes"]["telefoneContato"]})
                </Typography>
                <Typography>Origem: {pet["attributes"]["origem"]}</Typography>
                <Typography>
                  Cidade:{" "}
                  {pet["attributes"]["cidade"]["data"]["attributes"]["nome"]}
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Box>
        </Container>
      )}
    </Layout>
  );
};
export default Pet;
