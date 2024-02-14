import { User } from "src/entity/User";
import { getRepository } from "typeorm";

class CreateUserService {
  private userRepository = getRepository(User);

  async createUser(
    firstName: string,
    lastName: string,
    age: number
  ): Promise<User> {
    const newUser = this.userRepository.create({ firstName, lastName, age });
    return this.userRepository.save(newUser);
  }
}

export default CreateUserService;
