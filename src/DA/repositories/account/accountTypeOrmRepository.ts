import { getRepository } from 'typeorm';
import { hashData } from '../../../helpers/hash';
import { IAccount, IAccountRepository } from '../../../types/types';
import { Account } from '../../db/postgresql/entity/account';

export default class AccountTypeOrmRepository implements IAccountRepository {
  public async getById(id: string): Promise<IAccount | null> {
    const data: IAccount | undefined = await getRepository(Account).findOne({
      _id: id,
    });
    return data ? data : null;
  }

  public async getByUsername(username: string): Promise<IAccount | null> {
    const data: IAccount | undefined = await getRepository(Account).findOne({
      username,
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
    const hashedPassword = await hashData(entity.password);
    await getRepository(Account).save({
      ...entity,
      password: hashedPassword,
    } as Account);
    return entity;
  }
}
