import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';

it('can create an instance of auth service', async () => {
  // Create a fake copy of the users service
  const fakeUsersService = {
    find: () => Promise.resolve([]),
    create: (email: string, password: string) =>
      Promise.resolve({ id: 1, email, password }),
  };

  // Create a module (& a Dependncy Injection container)
  const module = await Test.createTestingModule({
    providers: [
      // Providers here are list of classes we want to register in our testing DI container
      AuthService,
      {
        provide: UsersService,
        useValue: fakeUsersService,
      },
    ],
  }).compile();

  // Reach into the module/DI container to get the AuthService
  const service = module.get(AuthService);

  expect(service).toBeDefined();
});
