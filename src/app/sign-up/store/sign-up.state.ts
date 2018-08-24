import { State } from '@ngxs/store';
​
@State({
  name: "signUp",
  defaults: {
    signUpForm: {
      model: undefined,
      dirty: false,
      status: "",
      errors: {}
    }
  }
})
export class SignUpState {}
