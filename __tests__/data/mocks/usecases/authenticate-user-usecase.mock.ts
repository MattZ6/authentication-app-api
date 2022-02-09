import faker from '@faker-js/faker';

import { IAuthenticateUserUseCase } from '@domain/usecases/user/AuthenticateUser';

export function makeAuthenticateUserUseCaseInputMock(): IAuthenticateUserUseCase.Input {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
}
