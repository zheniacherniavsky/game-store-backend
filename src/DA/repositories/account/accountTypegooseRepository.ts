import { mongoose } from '@typegoose/typegoose';
import { IAccount, IAccountRepository } from '../../../types/types';
import { Account, AccountModel } from '../../db/mongodb/models/account';
import { compareHashedData, hashData } from '../../../helpers/hash';
export default class AccountTypegooseRepository implements IAccountRepository {
  public async getById(id: string): Promise<IAccount | null> {
    const objectId = new mongoose.Types.ObjectId(id);

    const data: IAccount | null = await AccountModel.findOne({
      _id: objectId,
    });

    return data;
  }

  public async update(entity: IAccount): Promise<boolean> {
    const data: IAccount | null = await AccountModel.findOneAndUpdate(
      { _id: entity._id },
      entity as Account,
    );
    return data ? true : false;
  }

  public async delete(entity: IAccount): Promise<boolean> {
    const data = await AccountModel.deleteOne({ _id: entity._id });
    return data ? true : false;
  }

  public async create(entity: IAccount): Promise<IAccount> {
    const hashedPassword = await hashData(entity.password);
    await new AccountModel({
      ...entity,
      password: hashedPassword,
    }).save();
    return entity;
  }

  public async getAll(): Promise<IAccount[]> {
    const data: IAccount[] = await AccountModel.find();
    return data;
  }

  public async authenticate(
    username: string,
    password: string,
  ): Promise<IAccount | null> {
    const account: IAccount | null = await AccountModel.findOne({
      username,
    });
    if (account && (await compareHashedData(password, account.password)))
      return account;
    else return null;
  }
}
