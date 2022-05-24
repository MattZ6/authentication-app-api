import { UserNotFoundWithProvidedIdError } from '@domain/errors';
import { IUpdateUserNameUseCase } from '@domain/usecases/user/UpdateUserName';

import { badRequest, noContent, notFound } from '@presentation/helpers/http';
import {
  IController,
  IHttpRequest,
  IHttpResponse,
  IValidation,
} from '@presentation/protocols';
import { ValidationError } from '@presentation/validations/errors';

class UpdateProfileNameController implements IController {
  constructor(
    private readonly validation: IValidation,
    private readonly updateUserNameUseCase: IUpdateUserNameUseCase
  ) {}

  async handle(
    request: UpdateProfileNameController.Request
  ): Promise<UpdateProfileNameController.Response> {
    try {
      this.validation.validate(request.body);

      const { id } = request.user;
      const { name } = request.body;

      await this.updateUserNameUseCase.execute({ user_id: id, name });

      return noContent();
    } catch (error) {
      if (error instanceof ValidationError) {
        return badRequest(error);
      }

      if (error instanceof UserNotFoundWithProvidedIdError) {
        return notFound(error);
      }

      throw error;
    }
  }
}

namespace UpdateProfileNameController {
  type RequestBody = {
    name: string;
  };

  export type Request = IHttpRequest<RequestBody, void, void, void>;

  export type Response = IHttpResponse;
}

export { UpdateProfileNameController };
