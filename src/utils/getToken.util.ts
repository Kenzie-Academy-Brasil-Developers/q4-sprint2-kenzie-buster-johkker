const getToken = (authorization: string) => {
  return authorization.split(" ")[1];
};

export default getToken;
