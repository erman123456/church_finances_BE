import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<any> {
    const http = context.switchToHttp();
    const request = http.getRequest();
    if (!request.headers.authorization) {
      console.log('No Account');
      throw new ForbiddenException([{ isTokenMissing: 'Token is Required' }]);
    }
    const header_token = request.headers.authorization;
    const token = header_token.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException();
    }
    const validateToken = this.validateToken(token);
    if (!validateToken) {
      throw new UnauthorizedException();
    }
    return validateToken;
  }

  validateToken(auth: string) {
    if (auth.split(' ')[0] !== 'Bearer') {
      return null;
    }
    const token = auth.split(' ')[1];
    try {
      const secret = process.env.JWT_SECRET;
      return jwt.verify(token, secret);
    } catch (err) {
      return null;
    }
  }
}
