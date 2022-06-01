import { AppError } from "../errors";
import { IDvdCreate } from "../interfaces";
import { createDvd } from "../utils";

const createDvdSVC = async (data: IDvdCreate, adm: boolean) => {
  if (adm) {
    return await createDvd(data);
  }
  throw new AppError("Missing admin permission", 401);

  
};

export default createDvdSVC;
