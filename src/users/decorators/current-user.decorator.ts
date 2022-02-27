import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Currentuser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    console.log('Currently signed in user id: ', request.session.userId);
    console.log('Retrieve current user: ', request.currentUser);
    return request.currentUser;
  },
);
