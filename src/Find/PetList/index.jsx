/* eslint-disable react/prop-types */
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PetsService from "../../shared/services/pets";

const Pet = ({ imgUrl, city, gender, handleClick }) => (
  <Grid item xs={12} md={4}>
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={handleClick}>
        <CardMedia sx={{ height: 200 }} image={imgUrl} title="green iguana" />
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography>{city}</Typography>
            <Chip label={gender} variant="outlined" />
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  </Grid>
);

const PetList = ({ searchParams }) => {
  const navigate = useNavigate();
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const getPetList = async () => {
      const petList = (await PetsService.getPet(searchParams || {})).data.data;
      setPets(petList);
    };
    getPetList();
  }, [searchParams]);

  const handlePetClick = (id) => {
    navigate(`/pet/${id}`);
  };

  return (
    <Box sx={{ display: "flex", textAlign: "-webkit-center", mb: 2 }}>
      <Grid container>
        {pets.length &&
          pets.map((pet) => (
            <Pet
              gender={pet["attributes"]["sexo"]}
              handleClick={() => handlePetClick(pet["_id"])}
              imgUrl={
                pet["attributes"]["foto"]["data"][0]["attributes"]["formats"][
                  "thumbnail"
                ]["url"]
              }
              city={pet["attributes"]["cidade"]["data"]["attributes"]["nome"]}
              key={pet["_id"]}
            />
          ))}
        {!pets.length && (
          <Box>
            Nenhum pet encontrado. Tente alterar seus critérios de busca
          </Box>
        )}
      </Grid>
    </Box>
  );
};

export default PetList;
