import { User, UserAuth } from '../../models/user';


export class SignUpSuccessful {
  static readonly type = '[Sign-Up] Action]';
  constructor(public user: UserAuth) {}
}
