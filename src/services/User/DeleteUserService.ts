import { User } from "src/entity/User";
import { getRepository } from "typeorm";

class DeleteUserService {
  private userRepository = getRepository(User);
  async deleteUser(userId: number): Promise<void> {
    await this.userRepository.delete(userId);
  }
}

export default DeleteUserService;
