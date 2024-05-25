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

const Pet = ({ imgUrl, city, score, gender, handleClick }) => (
  <Grid item xs={12} md={4}>
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={handleClick}>
        <CardMedia sx={{ height: 200 }} image={imgUrl} title="green iguana" />
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography>{city}</Typography>
            {score && (
              <Typography variant="caption" sx={{ alignContent: "center" }}>
                {Math.round(score) * 100}% similar
              </Typography>
            )}
            <Chip label={gender} variant="outlined" />
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  </Grid>
);

const PetList = ({ searchParams, selectedImage, onChangeLoadingState }) => {
  const navigate = useNavigate();
  const [pets, setPets] = useState([]);
  const [page, setPage] = useState(1);
  const [petsLoading, setPetsLoading] = useState(1);
  const [currentSearchParams, setCurrentSearchParams] = useState({});

  const handleScroll = () => {
    console.log(
      window.innerHeight + document.documentElement.scrollTop,
      document.documentElement.offsetHeight
    );
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight * 0.9
    ) {
      console.log("setpage", page + 1);
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const getPetList = async () => {
      let petList;
      console.log(page, selectedImage);
      if (page != 1 && selectedImage) {
        return;
      }
      if (page == 1) {
        setPetsLoading(true);
      }
      if (onChangeLoadingState) onChangeLoadingState(true);
      if (!selectedImage) {
        petList = (await PetsService.getPet({ ...currentSearchParams, page }))
          .data.data;
      } else {
        petList = (
          await PetsService.getWithImageMatch(
            currentSearchParams,
            selectedImage
          )
        ).data.data;
      }
      if (page != 1) setPets([...pets, ...petList]);
      else setPets(petList);
      setPetsLoading(false);
      if (onChangeLoadingState) onChangeLoadingState(false);
    };
    getPetList();
  }, [page, currentSearchParams, selectedImage]);

  useEffect(() => {
    function isSame(obj1, obj2) {
      const obj1Keys = Object.keys(obj1);
      const obj2Keys = Object.keys(obj2);

      return (
        obj1Keys.length === obj2Keys.length &&
        obj1Keys.every((key) => obj1[key] === obj2[key])
      );
    }
    if (!isSame(currentSearchParams, searchParams)) {
      setPage(1);
      setCurrentSearchParams(searchParams);
    }
  }, [searchParams]);

  const handlePetClick = (id) => {
    navigate(`/pet/${id}`);
  };

  return (
    <Box sx={{ display: "flex", textAlign: "-webkit-center", mb: 2 }}>
      <Grid container spacing={2}>
        {!petsLoading &&
          pets.length &&
          pets.map((pet) => (
            <Pet
              gender={pet["attributes"]["sexo"]}
              handleClick={() => handlePetClick(pet["_id"])}
              imgUrl={
                pet["attributes"]["foto"]["data"][0]["attributes"]["formats"][
                  "thumbnail"
                ]["url"]
              }
              score={pet["score"]}
              city={pet["attributes"]["cidade"]["data"]["attributes"]["nome"]}
              key={pet["_id"]}
            />
          ))}
        {!petsLoading && !pets.length && (
          <Box>
            Nenhum pet encontrado. Tente alterar seus critérios de busca
          </Box>
        )}
        {petsLoading && <Box>Aguarde, carregando...</Box>}
      </Grid>
    </Box>
  );
};

export default PetList;
