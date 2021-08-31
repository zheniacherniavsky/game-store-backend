import { getModelForClass, index, prop } from '@typegoose/typegoose';
import { IAccount } from '../../../../types/types';

@index({ username: 1 }, { unique: true })
export class Account implements IAccount {
  @prop()
  public username: string;

  @prop()
  public password: string;

  @prop()
  public firstName: string;

  @prop()
  public lastName: string;

  @prop()
  public role: string;
}

export const AccountModel = getModelForClass(Account);
