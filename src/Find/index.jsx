import { useState } from "react";
import Layout from "../shared/Layout";
import FindPet from "./FindPet";
import PetList from "./PetList";

const Find = () => {
  const [searchParams, setSearchParams] = useState({});

  const handleSearch = (data) => {
    setSearchParams(data);
  };

  return (
    <Layout>
      <FindPet onSearch={handleSearch} />
      <PetList searchParams={searchParams} />
    </Layout>
  );
};
export default Find;
