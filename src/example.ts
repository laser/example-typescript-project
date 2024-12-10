import { logger } from '~/logger';
import { exhaustive } from '~/util/exhaustive';
import { Err, Ok, Result, unpack } from '~/util/result';

type User = {
  id: string;
};

type GetUserByIdErr =
  | { errCode: number; message: string; type: 'FLARP_SYSTEM_BROKEN' }
  | { message: string; type: 'DATABASE_OFFLINE' };

type UpdateUserEmailAddressErr =
  | { err: Error; type: 'DATABASE_OFFLINE' }
  | { message: string; originalInput: string; type: 'INVALID_EMAIL' };

type DoSomethingCoolErr =
  | { originalUserId: string; type: 'NO_MATCHING_USER_FOUND' }
  | GetUserByIdErr
  | UpdateUserEmailAddressErr;

class UserService {
  public async getUserById(_id: string): Promise<Result<null | User, GetUserByIdErr>> {
    throw new Error('just for type demonstration');
  }

  public async updateUserEmailAddress(_id: string, _email: string): Promise<Result<void, UpdateUserEmailAddressErr>> {
    throw new Error('just for type demonstration');
  }
}

async function doSomethingCool(): Promise<Result<void, DoSomethingCoolErr>> {
  const svc = new UserService();

  const userId = 'foo';

  const [err1, user] = await unpack(svc.getUserById('foo'));
  if (err1) {
    logger.error(`tried to get a user but failed because we suck: ${err1}`);
    return Err(err1);
  }

  if (!user) {
    return Err({ originalUserId: userId, type: 'NO_MATCHING_USER_FOUND' });
  }

  const [err2] = await unpack(svc.updateUserEmailAddress(user.id, 'l@s3r.me'));
  if (err2) {
    logger.error(`failed to update the user: err=${err2}`);
    return Err(err2);
  }

  return Ok(void 0);
}

async function exampleOfDoingSomethingCool(): Promise<void> {
  const [err] = await unpack(doSomethingCool());
  if (err) {
    switch (err.type) {
      case 'NO_MATCHING_USER_FOUND': {
        throw new Error();
      }
      case 'DATABASE_OFFLINE': {
        throw new Error();
      }
      case 'FLARP_SYSTEM_BROKEN': {
        throw new Error();
      }
      case 'INVALID_EMAIL': {
        throw new Error();
      }
      default: {
        exhaustive(err);
      }
    }
  }

  return void 0;
}
