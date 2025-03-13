import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ClerkExpressWithAuth, WithAuthProp } from '@clerk/clerk-sdk-node';
import { Request, Response } from 'express';

@Injectable()
export class ClerkAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<WithAuthProp<Request>>();
    const res = context.switchToHttp().getResponse<Response>();

    return new Promise((resolve, reject) => {
      ClerkExpressWithAuth()(req, res, (err) => {
        // console.log('🔍 Clerk Auth Debug:', { error: err, auth: req.auth });

        if (err || !req.auth?.userId) {
          reject(new UnauthorizedException('Authentication failed'));
        } else {
          resolve(true);
        }
      });
    });
  }
}