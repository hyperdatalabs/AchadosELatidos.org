/* eslint-disable react/prop-types */
import { Image, Search } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import PetsService from "../../shared/services/pets";

// eslint-disable-next-line react/prop-types
const FindSelect = ({ label, items, handleChange, ...props }) => (
  <FormControl fullWidth>
    <InputLabel id="demo-simple-select-label">{label}</InputLabel>
    <Select label={label} onChange={handleChange} {...props}>
      <MenuItem key={null} value={null}>
        Todos
      </MenuItem>
      {items.map((item) => (
        <MenuItem key={item.value} value={item.value}>
          {item.label}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

const FindPet = ({ onSearch, loading }) => {
  const [citys, setCitys] = useState([]);
  const [origins, setOrigins] = useState([]);
  const [petTypes, setPetTypes] = useState([]);
  const [genders, setGenders] = useState([]);
  const [sizes, setSizes] = useState([]);

  const [showImageUpload, setshowImageUpload] = useState(true);

  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedOrigin, setSelectedOrigin] = useState(null);
  const [selectedPetType, setSelectedPetType] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  const [selectedImage, setSelectedImage] = useState(null);
  const hiddenFileInput = useRef(null);

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
  const handleSizeChange = (e) => {
    setSelectedSize(e.target.value);
  };

  const handleSearch = () => {
    const payload = {
      "attributes.cidade.data.attributes.nome": selectedCity,
      "attributes.origem": selectedOrigin,
      "attributes.tipo": selectedPetType,
      "attributes.sexo": selectedGender,
      "attributes.porte": selectedSize,
    };

    const clean = (obj) => {
      for (let propName in obj) obj[propName] ?? delete obj[propName];
      return obj;
    };

    if (onSearch) {
      onSearch(clean(payload), selectedImage);
    }
  };

  useEffect(() => {
    const getFieldsValue = async (queryFilters) => {
      setCitys(
        (
          await PetsService.getDistinctFields({
            ...queryFilters,
            "attributes.cidade.data.attributes.nome": undefined,
            field: "attributes.cidade.data.attributes.nome",
          })
        ).data.data.map((e) => ({ label: e, value: e }))
      );
      setOrigins(
        (
          await PetsService.getDistinctFields({
            ...queryFilters,
            "attributes.origem": undefined,
            field: "attributes.origem",
          })
        ).data.data.map((e) => ({ label: e, value: e }))
      );
      setPetTypes(
        (
          await PetsService.getDistinctFields({
            ...queryFilters,
            "attributes.tipo": undefined,
            field: "attributes.tipo",
          })
        ).data.data.map((e) => ({ label: e, value: e }))
      );
      setGenders(
        (
          await PetsService.getDistinctFields({
            ...queryFilters,
            "attributes.sexo": undefined,
            field: "attributes.sexo",
          })
        ).data.data.map((e) => ({ label: e, value: e }))
      );
      setSizes(
        (
          await PetsService.getDistinctFields({
            ...queryFilters,
            "attributes.porte": undefined,
            field: "attributes.porte",
          })
        ).data.data.map((e) => ({ label: e, value: e }))
      );
    };

    const payload = {
      "attributes.cidade.data.attributes.nome": selectedCity,
      "attributes.origem": selectedOrigin,
      "attributes.tipo": selectedPetType,
      "attributes.sexo": selectedGender,
      "attributes.porte": selectedSize,
    };
    const clean = (obj) => {
      for (let propName in obj) obj[propName] ?? delete obj[propName];
      return obj;
    };

    getFieldsValue(clean(payload));
    // if (Object.values(clean(payload)).length < 2) {
    //   setshowImageUpload(false);
    //   handleImageClear();
    // } else {
    //   setshowImageUpload(true);
    // }
  }, [
    selectedCity,
    selectedOrigin,
    selectedPetType,
    selectedGender,
    selectedSize,
  ]);

  const handleImageChange = (event) => {
    const fileUploaded = event.target.files[0];
    setSelectedImage(fileUploaded);
  };

  const handleImageClear = () => {
    setSelectedImage(null);
  };

  const handleImageClick = () => {
    if (!loading) {
      hiddenFileInput.current.click();
    }
  };

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
        {citys && citys.length > 0 && (
          <Grid item xs={12} md={4}>
            <FindSelect
              handleChange={handleCityChange}
              label="Cidade"
              items={citys}
              disabled={loading}
            />
          </Grid>
        )}
        {origins && origins.length > 0 && (
          <Grid item xs={12} md={4}>
            <FindSelect
              handleChange={handleOriginChange}
              label="Origem"
              items={origins}
              disabled={loading}
            />
          </Grid>
        )}
        {petTypes && petTypes.length > 0 && (
          <Grid item xs={8} md={4}>
            <FindSelect
              handleChange={handlePetTypeChange}
              label="Tipo de pet"
              items={petTypes}
              disabled={loading}
            />
          </Grid>
        )}
        <Grid item xs={4} md={4}>
          <FindSelect
            handleChange={handleGenderChange}
            label="Sexo"
            items={genders}
            disabled={loading}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <FindSelect
            handleChange={handleSizeChange}
            label="Porte"
            items={sizes}
            disabled={loading}
          />
        </Grid>
        <Grid item xs={12}>
          <Divider>
            <Typography variant="overline">pesquise por imagem</Typography>
          </Divider>
        </Grid>
        <Grid item xs={12} onClick={handleImageClick}>
          {/* {!showImageUpload && (
            <Box sx={{ textAlign: "center", my: 2 }}>
              <Typography variant="caption">
                São necessários ao menos 2 filtros para utilizar a busca por
                imagem. <br />
                Estamos trabalhando incessantemente para evoluir a busca e
                trazer a melhor experiência para você!!
              </Typography>
            </Box>
          )} */}
          {showImageUpload && (
            <Grid
              sx={{
                cursor: !loading && "pointer",
                opacity: loading ? 0.4 : 1,
                my: 2,
                "&:hover": {
                  opacity: !loading && 0.8,
                },
              }}
              container
            >
              <Grid item xs>
                <Box fullWidth fullHeight>
                  <Box sx={{ textAlign: "center" }}>
                    {!selectedImage && (
                      <Image sx={{ fontSize: "10rem", border: "1px dashed" }} />
                    )}
                    {selectedImage && (
                      <Box
                        sx={{
                          width: "10rem",
                          objectFit: "cover",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center",
                        }}
                        component="img"
                        src={URL.createObjectURL(selectedImage)}
                      />
                    )}
                  </Box>
                </Box>
              </Grid>
              <Grid
                sx={{
                  textAlign: "center",
                  alignContent: "center",
                }}
                item
                xs
              >
                {!selectedImage && (
                  <>
                    <Typography>Selecione uma imagem</Typography>
                    <Typography variant="caption">
                      Sua imagem deverá ter no máximo 10 MB, e ter como extensão
                      (parte final do nome): .png, .jpg e .jpeg
                    </Typography>
                  </>
                )}
                {selectedImage && (
                  <>
                    <Typography>Agora basta clicar em buscar!</Typography>
                    <Typography variant="caption">
                      Você também pode remover o filtro no botão abaixo
                    </Typography>
                    <Box>
                      <Button
                        disabled={loading}
                        sx={{ my: 2 }}
                        onClick={handleImageClear}
                      >
                        REMOVER IMAGEM
                      </Button>
                    </Box>
                  </>
                )}
              </Grid>
              <input
                hidden
                onChange={handleImageChange}
                type="file"
                accept=".jpg,.jpeg,.png"
                ref={hiddenFileInput}
              />
            </Grid>
          )}
        </Grid>
        <Grid item xs={12} md={12} mx={{ alignContent: "center" }}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<Search />}
            onClick={handleSearch}
            disabled={loading}
          >
            Buscar
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FindPet;
