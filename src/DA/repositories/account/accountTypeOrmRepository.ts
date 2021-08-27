import { getRepository } from 'typeorm';
import { IAccount, IAccountRepository } from '../../../types/types';
import { Account } from '../../db/postgresql/entity/account';

export default class AccountTypeOrmRepository implements IAccountRepository {
  public async getById(id: string): Promise<IAccount | null> {
    const data: IAccount | undefined = await getRepository(Account).findOne({
      _id: id,
    });
    return data ? data : null;
  }
  public async update(entity: IAccount): Promise<boolean> {
    await getRepository(Account).update(
      { _id: (entity as Account)._id },
      entity as Account,
    );
    return true;
  }

  public async delete(entity: IAccount): Promise<boolean> {
    await getRepository(Account).delete({ _id: (entity as Account)._id });
    return true;
  }

  public async create(entity: IAccount): Promise<IAccount> {
    const data = await getRepository(Account).save(entity as Account);
    return data;
  }

  public async getAll(): Promise<IAccount[]> {
    const data: IAccount[] = await getRepository(Account).find({});

    return data;
  }
}