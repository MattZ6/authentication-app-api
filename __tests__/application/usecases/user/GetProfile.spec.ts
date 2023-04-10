import { beforeEach, describe, expect, it, vitest } from 'vitest'

import { UserNotFoundWithProvidedIdError } from '@domain/errors'

import { GetUserProfileUseCase } from '@application/usecases/user/GetProfile'

import { makeErrorMock, makeUserMock } from '../../../domain'
import {
  FindUserByIdRepositorySpy,
  makeGetUserProfileUseCaseInputMock,
} from '../../mocks'

let findUserByIdRepositorySpy: FindUserByIdRepositorySpy

let getUserProfileUseCase: GetUserProfileUseCase

describe('GetUserProfileUseCase', () => {
  beforeEach(() => {
    findUserByIdRepositorySpy = new FindUserByIdRepositorySpy()

    getUserProfileUseCase = new GetUserProfileUseCase(findUserByIdRepositorySpy)
  })

  it('should call FindUserByIdRepository once with correct values', async () => {
    const findByIdSpy = vitest.spyOn(findUserByIdRepositorySpy, 'findById')

    const input = makeGetUserProfileUseCaseInputMock()

    await getUserProfileUseCase.execute(input)

    expect(findByIdSpy).toHaveBeenCalledTimes(1)
    expect(findByIdSpy).toHaveBeenCalledWith({ id: input.user_id })
  })

  it('should throw if FindUserByIdRepository throws', async () => {
    const errorMock = makeErrorMock()

    vitest
      .spyOn(findUserByIdRepositorySpy, 'findById')
      .mockRejectedValueOnce(errorMock)

    const input = makeGetUserProfileUseCaseInputMock()

    const promise = getUserProfileUseCase.execute(input)

    await expect(promise).rejects.toThrowError(errorMock)
  })

  it('should UserNotFoundWithProvidedIdError if FindUserByIdRepository returns undefined', async () => {
    vitest
      .spyOn(findUserByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce(undefined)

    const input = makeGetUserProfileUseCaseInputMock()

    const promise = getUserProfileUseCase.execute(input)

    await expect(promise).rejects.toBeInstanceOf(
      UserNotFoundWithProvidedIdError,
    )
  })

  it('should return user on success', async () => {
    const userMock = makeUserMock()

    vitest
      .spyOn(findUserByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce(userMock)

    const input = makeGetUserProfileUseCaseInputMock()

    const output = await getUserProfileUseCase.execute(input)

    expect(output).toEqual(userMock)
  })
})
