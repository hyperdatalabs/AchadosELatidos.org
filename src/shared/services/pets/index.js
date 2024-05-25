import getPet from "./getPet";
import getDistinctFields from "./getDistinctFields";
import getWithImageMatch from "./getWithImageMatch";

import axios from "axios";

export default {
  getPet: (query) => getPet(axios, query),
  getDistinctFields: (query) => getDistinctFields(axios, query),
  getWithImageMatch: (query, file) => getWithImageMatch(axios, query, file),
};
