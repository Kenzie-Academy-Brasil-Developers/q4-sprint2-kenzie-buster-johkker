import { userRepository } from "../repositories";

const getUsersSVC = async () => {
  const users = await userRepository.find();

  let treatedUsers: any = [];
  users.map((user) => {
    const { password, ...rest } = user;
    treatedUsers.push(rest);
  });

  return treatedUsers;
};

export default getUsersSVC;
