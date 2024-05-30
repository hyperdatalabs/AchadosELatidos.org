/* eslint-disable react/prop-types */
import { Image, Search } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import PetsService from "../../shared/services/pets";

// eslint-disable-next-line react/prop-types
const FindSelect = ({ label, items, handleChange, ...props }) => (
  <FormControl fullWidth>
    <InputLabel>{label}</InputLabel>
    <Select
      label={label}
      onChange={handleChange}
      multiple
      renderValue={(selected) => selected.sort().join(", ")}
      {...props}
    >
      <MenuItem key={null} value={[]}>
        Todos
      </MenuItem>
      {items.map((item) => (
        <MenuItem key={item.value} value={item.value}>
          <Checkbox
            checked={!!props.value.find((el) => el == item.value)}
          />
          <ListItemText primary={item.label} />
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

const HIDE_OPTIONS_LIST = [
  null,
  undefined,
  "",
  "Não sei",
  "Não identificado",
  "Não informado",
  "Não informada",
];

const FindPet = ({ onSearch, loading }) => {
  const [citys, setCitys] = useState([]);
  const [origins, setOrigins] = useState([]);
  const [petTypes, setPetTypes] = useState([]);
  const [genders, setGenders] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [status, setStatus] = useState([]);

  const [showImageUpload, setshowImageUpload] = useState(true);
  const [draggingUpload, setDraggingUpload] = useState(false);

  const [selectedCity, setSelectedCity] = useState([]);
  const [selectedOrigin, setSelectedOrigin] = useState([]);
  const [selectedPetType, setSelectedPetType] = useState([]);
  const [selectedGender, setSelectedGender] = useState([]);
  const [selectedSize, setSelectedSize] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState([]);

  const [selectedImage, setSelectedImage] = useState(null);
  const hiddenFileInput = useRef(null);

  const handleFilterChange = (e, setFunction) => {
    console.log(e.target.value);
    const {
      target: { value },
    } = e;
    if (value.some((el) => Array.isArray(el))) {
      setFunction([]);
      return;
    }

    setFunction(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleCityChange = (e) => {
    handleFilterChange(e, setSelectedCity);
  };

  const handleOriginChange = (e) => {
    handleFilterChange(e, setSelectedOrigin);
  };

  const handlePetTypeChange = (e) => {
    handleFilterChange(e, setSelectedPetType);
  };
  const handleGenderChange = (e) => {
    handleFilterChange(e, setSelectedGender);
  };
  const handleSizeChange = (e) => {
    handleFilterChange(e, setSelectedSize);
  };
  const handleStatusChange = (e) => {
    handleFilterChange(e, setSelectedStatus);
  };

  const handleSearch = () => {
    const payload = {
      "attributes.cidade.data.attributes.nome": { $in: selectedCity },
      "attributes.origem": { $in: selectedOrigin },
      "attributes.tipo": { $in: selectedPetType },
      "attributes.sexo": { $in: selectedGender },
      "attributes.porte": { $in: selectedSize },
      "attributes.situacao": { $in: selectedStatus },
    };

    const clean = (obj) => {
      for (let propName in obj) !obj[propName].$in.length && delete obj[propName];
      return obj;
    };

    if (onSearch) {
      document.querySelector("#pets").scrollIntoView();
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
        ).data.data
          .map((e) => ({ label: e, value: e }))
          .filter((e) => !HIDE_OPTIONS_LIST.includes(e.label))
      );
      setOrigins(
        (
          await PetsService.getDistinctFields({
            ...queryFilters,
            "attributes.origem": undefined,
            field: "attributes.origem",
          })
        ).data.data
          .map((e) => ({ label: e, value: e }))
          .filter((e) => !HIDE_OPTIONS_LIST.includes(e.label))
      );
      setPetTypes(
        (
          await PetsService.getDistinctFields({
            ...queryFilters,
            "attributes.tipo": undefined,
            field: "attributes.tipo",
          })
        ).data.data
          .map((e) => ({ label: e, value: e }))
          .filter((e) => !HIDE_OPTIONS_LIST.includes(e.label))
      );
      setGenders(
        (
          await PetsService.getDistinctFields({
            ...queryFilters,
            "attributes.sexo": undefined,
            field: "attributes.sexo",
          })
        ).data.data
          .map((e) => ({ label: e, value: e }))
          .filter((e) => !HIDE_OPTIONS_LIST.includes(e.label))
      );
      setSizes(
        (
          await PetsService.getDistinctFields({
            ...queryFilters,
            "attributes.porte": undefined,
            field: "attributes.porte",
          })
        ).data.data
          .map((e) => ({ label: e, value: e }))
          .filter((e) => !HIDE_OPTIONS_LIST.includes(e.label))
      );
      setStatus(
        (
          await PetsService.getDistinctFields({
            ...queryFilters,
            "attributes.situacao": undefined,
            field: "attributes.situacao",
          })
        ).data.data
          .map((e) => ({ label: e, value: e }))
          .filter((e) => !HIDE_OPTIONS_LIST.includes(e.label))
      );
    };

    const payload = {
      "attributes.cidade.data.attributes.nome": { $in: selectedCity },
      "attributes.origem": { $in: selectedOrigin },
      "attributes.tipo": { $in: selectedPetType },
      "attributes.sexo": { $in: selectedGender },
      "attributes.porte": { $in: selectedSize },
      "attributes.situacao": { $in: selectedStatus },
    };
    const clean = (obj) => {
      for (let propName in obj) !obj[propName].$in.length && delete obj[propName];
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
    selectedStatus,
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

  const handleFileDrop = (e) => {
    e.preventDefault();
    setDraggingUpload(false);
    if (e.dataTransfer.files.length) setSelectedImage(e.dataTransfer.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDraggingUpload(true);
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
      <Grid container spacing={2} sx={{ my: 2 }} id="find">
        {citys && citys.length > 0 && (
          <Grid item xs={12} md={4}>
            <FindSelect
              handleChange={handleCityChange}
              label="Cidade"
              items={citys}
              disabled={loading}
              value={selectedCity}
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
              value={selectedOrigin}
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
              value={selectedPetType}
            />
          </Grid>
        )}
        {genders && genders.length > 0 && (
          <Grid item xs={4} md={4}>
            <FindSelect
              handleChange={handleGenderChange}
              label="Sexo"
              items={genders}
              disabled={loading}
              value={selectedGender}
            />
          </Grid>
        )}
        {sizes && sizes.length > 0 && (
          <Grid item xs={12} md={4}>
            <FindSelect
              handleChange={handleSizeChange}
              label="Porte"
              items={sizes}
              value={selectedSize}
              disabled={loading}
            />
          </Grid>
        )}
        {status && status.length > 0 && (
          <Grid item xs={12} md={4}>
            <FindSelect
              handleChange={handleStatusChange}
              label="Situação"
              items={status}
              value={selectedStatus}
              disabled={loading}
            />
          </Grid>
        )}
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
              onDragLeave={() => setDraggingUpload(false)}
              onDragOver={handleDragOver}
              onDrop={handleFileDrop}
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
                {!selectedImage && !draggingUpload && (
                  <>
                    <Typography>Selecione uma imagem</Typography>
                    <Typography variant="caption">
                      Sua imagem deverá ter no máximo 10 MB, e ter como extensão
                      (parte final do nome): .png, .jpg e .jpeg
                    </Typography>
                  </>
                )}
                {draggingUpload && (
                  <>
                    <Typography>Solte seu arquivo aqui dentro</Typography>
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
        <Grid
          item
          sx={{ my: 4 }}
          xs={12}
          md={12}
          mx={{ alignContent: "center" }}
        >
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
