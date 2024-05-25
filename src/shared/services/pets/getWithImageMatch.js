import consts from "../../consts";

const getWithImageMatch = (connInstance, query, file) => {
  return connInstance.postForm(`${consts.API_URL}/pets/image`, {
    filters: JSON.stringify(query),
    file: file,
  });
};

export default getWithImageMatch;
