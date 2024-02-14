import { User } from "src/entity/User";
import { getRepository } from "typeorm";

class ListUsersService {
    private userRepository = getRepository(User);
      async listUsers(): Promise<User[]> {
    return this.userRepository.find();
  }
}
export default ListUsersService