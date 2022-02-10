import { IUser } from '@domain/models/User';

interface IUpdateUserPasswordUseCase {
  execute(
    data: IUpdateUserPasswordUseCase.Input
  ): Promise<IUpdateUserPasswordUseCase.Output>;
}

namespace IUpdateUserPasswordUseCase {
  export type Input = {
    user_id: string;
    old_password: string;
    new_password: string;
  };

  export type Output = IUser;
}

export { IUpdateUserPasswordUseCase };
