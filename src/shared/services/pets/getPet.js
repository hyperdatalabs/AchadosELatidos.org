import consts from "../../consts";

const getPets = (connInstance, query) => {
  return connInstance.get(`${consts.API_URL}/pets`, { params: query });
};

export default getPets;
