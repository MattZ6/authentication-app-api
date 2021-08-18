import { hash, compare } from 'bcryptjs';

import { ICompareHashProvider } from '@data/protocols/cryptography/hash/CompareHashProvider';
import { IGenerateHashProvider } from '@data/protocols/cryptography/hash/GenerateHashProvider';

export class BcryptHashProvider
  implements IGenerateHashProvider, ICompareHashProvider
{
  constructor(private readonly salt: number) {}

  hash(value: string): Promise<string> {
    return hash(value, this.salt);
  }

  compare(value: string, hashedValue: string): Promise<boolean> {
    return compare(value, hashedValue);
  }
}
