import { User } from '@domain/models/User';

interface ICreateUserUseCase {
  execute(data: ICreateUserUseCase.Input): Promise<ICreateUserUseCase.Output>;
}

namespace ICreateUserUseCase {
  export type Input = {
    name: string;
    email: string;
    password: string;
  };

  export type Output = User;
}

export { ICreateUserUseCase };
