/* eslint-disable react/prop-types */
import { ExpandMore, Info, Share, Warning } from "@mui/icons-material";
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
import { useParams } from "react-router-dom";
import Layout from "../shared/Layout";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    const getPetFromService = async (id) => {
      const petsResponse = (await PetsService.getPet({ _id: id }))["data"][
        "data"
      ][0];
      setPet(petsResponse);
    };
    getPetFromService(id);
  }, []);

  const handleShare = () => {
    navigator.share({
      text: `Olá, eu estou tentando apoiar compartilhando este cãozinho. Ele está disponível em: ${window.origin}`,
    });
  };

  return (
    <Layout>
      {pet && pet["attributes"] && (
        <Container sx={{ my: 4 }}>
          <PetBreadcrumbs
            petType={pet && pet["attributes"] && pet["attributes"]["tipo"]}
          />
          <Box sx={{ textAlign: "center" }}>
            <Box
              component="img"
              sx={{ maxWidth: "100%", my: 2 }}
              loading="lazy"
              src={
                pet["attributes"]["foto"]["data"][0]["attributes"]["formats"][
                  "medium"
                ].url
              }
            />
          </Box>
          <Button
            onClick={handleShare}
            startIcon={<Share />}
            variant="outlined"
            fullWidth
          >
            Compartilhe e ajude-o à alcançar mais pessoas
          </Button>
          <Box
            sx={{
              my: 2,
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
          {pet["attributes"]["abrigo"]["data"] != null && (
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
          {!pet["attributes"]["abrigo"]["data"] && (
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
