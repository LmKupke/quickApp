import { User } from '../../models/user';


export class SignUpSuccessful {
  static readonly type = '[Sign-Up] Action]';
  constructor(public user: User) {}
}
