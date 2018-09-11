import { SignUpRoutingModule } from './sign-up-routing.module';

describe('SignUpRoutingModule', () => {
  let signUpRoutingModule: SignUpRoutingModule;

  beforeEach(() => {
    signUpRoutingModule = new SignUpRoutingModule();
  });

  it('should create an instance', () => {
    expect(signUpRoutingModule).toBeTruthy();
  });
});
