import { User } from "src/entity/User";
import { FindOneOptions, getRepository } from "typeorm";

class UpdateUserService {
  private userRepository = getRepository(User);

  async updateUser(
    userId: number,
    newData: Partial<User>
  ): Promise<User | undefined> {
    const options: FindOneOptions<User> = { where: { id: userId } };
    const userToUpdate = await this.userRepository.findOne(options);

    if (!userToUpdate) {
      return undefined;
    }

    Object.assign(userToUpdate, newData);

    const updatedUser = await this.userRepository.save(userToUpdate);

    return updatedUser;
  }
}

export default UpdateUserService;
