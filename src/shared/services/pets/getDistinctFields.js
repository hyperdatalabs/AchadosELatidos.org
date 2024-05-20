import consts from "../../consts";

const getDistinctFields = (connInstance, query) => {
  return connInstance.get(`${consts.API_URL}/pets/distinct-field`, {
    params: query,
  });
};

export default getDistinctFields;
