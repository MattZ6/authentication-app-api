import { beforeEach, describe, expect, it, vitest } from 'vitest'

import {
  UserNotFoundWithProvidedIdError,
  WrongPasswordError,
} from '@domain/errors'

import { UpdateProfilePasswordController } from '@presentation/controllers/user/UpdateProfilePassword'
import {
  badRequest,
  notFound,
  unprocessableEntity,
  noContent,
} from '@presentation/helpers/http'

import { makeErrorMock } from '../../../domain'
import {
  ValidationSpy,
  UpdateUserPasswordUseCaseSpy,
  makeUpdateProfilePasswordControllerRequestMock,
  makeValidationErrorMock,
} from '../../mocks'

let validation: ValidationSpy
let updateUserPasswordUseCaseSpy: UpdateUserPasswordUseCaseSpy

let updateProfilePasswordController: UpdateProfilePasswordController

describe('UpdateProfilePasswordController', () => {
  beforeEach(() => {
    validation = new ValidationSpy()
    updateUserPasswordUseCaseSpy = new UpdateUserPasswordUseCaseSpy()

    updateProfilePasswordController = new UpdateProfilePasswordController(
      validation,
      updateUserPasswordUseCaseSpy,
    )
  })

  it('should call Validation with correct values', async () => {
    const validateSpy = vitest.spyOn(validation, 'validate')

    const request = makeUpdateProfilePasswordControllerRequestMock()

    await updateProfilePasswordController.handle(request)

    expect(validateSpy).toHaveBeenCalledTimes(1)
    expect(validateSpy).toHaveBeenCalledWith(request.body)
  })

  it('should throw if Validation throws', async () => {
    const error = makeErrorMock()

    vitest.spyOn(validation, 'validate').mockImplementationOnce(() => {
      throw error
    })

    const request = makeUpdateProfilePasswordControllerRequestMock()

    const promise = updateProfilePasswordController.handle(request)

    await expect(promise).rejects.toThrowError(error)
  })

  it('should return bad request (400) if Validation throws ValidationError', async () => {
    const error = makeValidationErrorMock()

    vitest.spyOn(validation, 'validate').mockReturnValueOnce(error)

    const request = makeUpdateProfilePasswordControllerRequestMock()

    const response = await updateProfilePasswordController.handle(request)

    expect(response).toEqual(badRequest(error))
  })

  it('should call UpdateProfilePasswordController once with correct data', async () => {
    const executeSpy = vitest.spyOn(updateUserPasswordUseCaseSpy, 'execute')

    const request = makeUpdateProfilePasswordControllerRequestMock()

    await updateProfilePasswordController.handle(request)

    expect(executeSpy).toHaveBeenCalledTimes(1)
    expect(executeSpy).toHaveBeenCalledWith({
      user_id: request.user.id,
      old_password: request.body.old_password,
      new_password: request.body.new_password,
    })
  })

  it('should throw if UpdateProfilePasswordController throws', async () => {
    const errorMock = makeErrorMock()

    vitest
      .spyOn(updateUserPasswordUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock)

    const request = makeUpdateProfilePasswordControllerRequestMock()

    const promise = updateProfilePasswordController.handle(request)

    await expect(promise).rejects.toThrowError(errorMock)
  })

  it('should return not found (404) if UpdateUserPasswordUseCase throws UserNotFoundWithProvidedIdError', async () => {
    const error = new UserNotFoundWithProvidedIdError()

    vitest
      .spyOn(updateUserPasswordUseCaseSpy, 'execute')
      .mockRejectedValueOnce(error)

    const request = makeUpdateProfilePasswordControllerRequestMock()

    const response = await updateProfilePasswordController.handle(request)

    expect(response).toEqual(notFound(error))
  })

  it('should return unprocessable entity (422) if UpdateUserPasswordUseCase throws WrongPasswordError', async () => {
    const error = new WrongPasswordError()

    vitest
      .spyOn(updateUserPasswordUseCaseSpy, 'execute')
      .mockRejectedValueOnce(error)

    const request = makeUpdateProfilePasswordControllerRequestMock()

    const response = await updateProfilePasswordController.handle(request)

    expect(response).toEqual(unprocessableEntity(error))
  })

  it('should return no content (204) on success', async () => {
    const request = makeUpdateProfilePasswordControllerRequestMock()

    const response = await updateProfilePasswordController.handle(request)

    expect(response).toEqual(noContent())
  })
})
