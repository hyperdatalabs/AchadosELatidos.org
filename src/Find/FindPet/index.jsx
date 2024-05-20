/* eslint-disable react/prop-types */
import { Search } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import PetsService from "../../shared/services/pets";

// eslint-disable-next-line react/prop-types
const FindSelect = ({ label, items, handleChange, ...props }) => (
  <FormControl fullWidth>
    <InputLabel id="demo-simple-select-label">{label}</InputLabel>
    <Select label={label} onChange={handleChange} {...props}>
      {items.map((item) => (
        <MenuItem key={item.value} value={item.value}>
          {item.label}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

const FindPet = ({ onSearch }) => {
  const [citys, setCitys] = useState([]);
  const [origins, setOrigins] = useState([]);
  const [petTypes, setPetTypes] = useState([]);
  const [genders, setGenders] = useState([]);

  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedOrigin, setSelectedOrigin] = useState(null);
  const [selectedPetType, setSelectedPetType] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const handleOriginChange = (e) => {
    setSelectedOrigin(e.target.value);
  };
  const handlePetTypeChange = (e) => {
    setSelectedPetType(e.target.value);
  };
  const handleGenderChange = (e) => {
    setSelectedGender(e.target.value);
  };

  const handleSearch = () => {
    const payload = {
      "attributes.cidade.data.attributes.nome": selectedCity,
      "attributes.origem": selectedOrigin,
      "attributes.tipo": selectedPetType,
      "attributes.sexo": selectedGender,
    };

    const clean = (obj) => {
      for (let propName in obj) obj[propName] ?? delete obj[propName];
      return obj;
    };

    if (onSearch) {
      onSearch(clean(payload));
    }
  };

  useEffect(() => {
    const getFieldsValue = async () => {
      setCitys(
        (
          await PetsService.getDistinctFields({
            field: "attributes.cidade.data.attributes.nome",
          })
        ).data.data.map((e) => ({ label: e, value: e }))
      );
      setOrigins(
        (
          await PetsService.getDistinctFields({
            field: "attributes.origem",
          })
        ).data.data.map((e) => ({ label: e, value: e }))
      );
      setPetTypes(
        (
          await PetsService.getDistinctFields({
            field: "attributes.tipo",
          })
        ).data.data.map((e) => ({ label: e, value: e }))
      );

      setGenders(
        (
          await PetsService.getDistinctFields({
            field: "attributes.sexo",
          })
        ).data.data.map((e) => ({ label: e, value: e }))
      );
    };

    getFieldsValue();
  }, []);

  return (
    <Box sx={{ my: 4 }}>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h3">Encontre seu pet</Typography>
        <Typography>
          Utilize os critérios abaixo para encontrar o seu animal. Quantos mais
          critérios maior a chance de você encontrar!!
        </Typography>
      </Box>
      <Grid container spacing={2} sx={{ my: 2 }}>
        {citys && citys.length && (
          <Grid item xs={12} md={4}>
            <FindSelect
              handleChange={handleCityChange}
              label="Cidade"
              items={citys}
            />
          </Grid>
        )}
        {origins && origins.length && (
          <Grid item xs={12} md={4}>
            <FindSelect
              handleChange={handleOriginChange}
              label="Origem"
              items={origins}
            />
          </Grid>
        )}
        {petTypes && petTypes.length && (
          <Grid item xs={8} md={4}>
            <FindSelect
              handleChange={handlePetTypeChange}
              label="Tipo de pet"
              items={petTypes}
            />
          </Grid>
        )}
        <Grid item xs={4} md={4}>
          <FindSelect
            handleChange={handleGenderChange}
            label="Sexo"
            items={genders}
          />
        </Grid>
        <Grid item xs={12} md={4} mx={{ alignContent: "center" }}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<Search />}
            onClick={handleSearch}
          >
            Buscar
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FindPet;
