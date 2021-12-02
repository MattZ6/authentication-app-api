import { UserAlreadyExistsWithThisEmailError } from '@domain/errors';
import { IUserModel } from '@domain/models/User';
import { ICreateUserUseCase, CreateUserDTO } from '@domain/usecases/CreateUser';

import { IGenerateHashProvider } from '@data/protocols/cryptography/hash';
import {
  ICheckIfUserExistsByEmail,
  ICreateUserRepository,
} from '@data/protocols/repositories/user';

export class CreateUseUseCase implements ICreateUserUseCase {
  constructor(
    private readonly checkIfUserExistsByEmail: ICheckIfUserExistsByEmail,
    private readonly generateHashProvider: IGenerateHashProvider,
    private readonly createUserRepository: ICreateUserRepository
  ) {}

  async execute(data: CreateUserDTO): Promise<IUserModel> {
    const { name, email, password } = data;

    const alreadyExists =
      await this.checkIfUserExistsByEmail.checkIfExistsByEmail(email);

    if (alreadyExists) {
      throw new UserAlreadyExistsWithThisEmailError();
    }

    const passwordHash = await this.generateHashProvider.hash(password);

    const user = await this.createUserRepository.create({
      name,
      email,
      password_hash: passwordHash,
    });

    return user;
  }
}
