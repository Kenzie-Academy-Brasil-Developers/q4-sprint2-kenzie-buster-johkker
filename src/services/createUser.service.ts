import { AppError } from "../errors";
import { IUserCreate } from "../interfaces";
import { createUser } from "../utils";

const createUserSVC = async (data: IUserCreate, adm: boolean) => {
  const { isAdm } = data;

  // if (isAdm) {
  //   if (adm) {
  //     return await createUser(data);
  //   }
  //   throw new AppError("Missing admin permission", 401);
  // }

  return await createUser(data);
};

export default createUserSVC;
