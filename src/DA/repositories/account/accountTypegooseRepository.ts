import { mongoose } from '@typegoose/typegoose';
import { IAccount, IAccountRepository } from '../../../types/types';
import { Account, AccountModel } from '../../db/mongodb/models/account';
import { hashData } from '../../../helpers/hash';
export default class AccountTypegooseRepository implements IAccountRepository {
  public async getById(id: string): Promise<IAccount | null> {
    const objectId = new mongoose.Types.ObjectId(id);

    const data: IAccount | null = await AccountModel.findOne({
      _id: objectId,
    });

    return data;
  }

  public async getByUsername(username: string): Promise<IAccount | null> {
    const data: IAccount | null = await AccountModel.findOne({
      username,
    });

    return data;
  }

  public async update(entity: IAccount): Promise<IAccount | null> {
    await AccountModel.findOneAndUpdate({ _id: entity._id }, entity as Account);
    const data = entity._id !== undefined ? await this.getById(entity._id.toString()) : null;
    return data;
  }

  public async delete(id: string): Promise<boolean> {
    const data = await AccountModel.deleteOne({ _id: id });
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
}
