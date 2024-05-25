import { useState } from "react";
import Layout from "../shared/Layout";
import FindPet from "./FindPet";
import PetList from "./PetList";

const Find = () => {
  const [searchParams, setSearchParams] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = (data, selectedImage) => {
    setSearchParams(data);
    setSelectedImage(selectedImage);
  };

  const handleLoading = (isLoading) => {
    setLoading(isLoading);
  };

  return (
    <Layout>
      <FindPet onSearch={handleSearch} loading={loading} />
      <PetList
        searchParams={searchParams}
        selectedImage={selectedImage}
        onChangeLoadingState={handleLoading}
      />
    </Layout>
  );
};
export default Find;
