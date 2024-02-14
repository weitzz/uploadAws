import { User } from "src/entity/User";
import { FindOneOptions, getRepository } from "typeorm";
class GetUserIdService {
  private userRepository = getRepository(User);
  async getUserById(userId: number): Promise<User | undefined> {
    const options: FindOneOptions<User> = { where: { id: userId } };
    const userToUpdate = await this.userRepository.findOne(options);
    const user = await this.userRepository.findOne(options);
    return user;
  }
}

export default GetUserIdService;
