import { User } from '@domain/models/User';

interface IUpdateUserEmailUseCase {
  execute(
    data: IUpdateUserEmailUseCase.Input
  ): Promise<IUpdateUserEmailUseCase.Output>;
}

namespace IUpdateUserEmailUseCase {
  export type Input = {
    user_id: string;
    email: string;
  };

  export type Output = User;
}

export { IUpdateUserEmailUseCase };
