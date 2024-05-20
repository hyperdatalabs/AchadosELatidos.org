import getPet from "./getPet";
import getDistinctFields from "./getDistinctFields";
import axios from "axios";

export default {
  getPet: (query) => getPet(axios, query),
  getDistinctFields: (query) => getDistinctFields(axios, query),
};
