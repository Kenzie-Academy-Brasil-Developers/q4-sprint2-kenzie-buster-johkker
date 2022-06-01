import { dvdRepository } from "../repositories";

const getDvdsSVC = async () => {
  return await dvdRepository.find();
};

export default getDvdsSVC;
