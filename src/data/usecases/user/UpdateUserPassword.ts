import {
  WrongPasswordError,
  UserNotFoundWithThisIdError,
} from '@domain/errors';
import { IUpdateUserPasswordUseCase } from '@domain/usecases/user/UpdateUserPassword';

import {
  ICompareHashProvider,
  IGenerateHashProvider,
} from '@data/protocols/providers/cryptography/hash';
import {
  IFindUserByIdRepository,
  IUpdateUserRepository,
} from '@data/protocols/repositories/user';

export class UpdateUserPasswordUseCase implements IUpdateUserPasswordUseCase {
  constructor(
    private readonly findUserByIdRepository: IFindUserByIdRepository,
    private readonly compareHashProvider: ICompareHashProvider,
    private readonly generateHashProvider: IGenerateHashProvider,
    private readonly updateUserRepository: IUpdateUserRepository
  ) {}

  async execute(
    data: IUpdateUserPasswordUseCase.Input
  ): Promise<IUpdateUserPasswordUseCase.Output> {
    const { user_id, old_password, new_password } = data;

    const user = await this.findUserByIdRepository.findById({ id: user_id });

    if (!user) {
      throw new UserNotFoundWithThisIdError();
    }

    const passwordsMatch = await this.compareHashProvider.compare({
      value: old_password,
      hashed_value: user.password_hash,
    });

    if (!passwordsMatch) {
      throw new WrongPasswordError();
    }

    user.password_hash = await this.generateHashProvider.hash({
      value: new_password,
    });

    await this.updateUserRepository.update(user);
  }
}
