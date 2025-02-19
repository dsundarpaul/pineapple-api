import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { IS_PUBLIC_KEY } from "src/shared/decorators/public-endpoint.decorator";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  private readonly logger = new Logger(AuthGuard.name);

  async canActivate(context: ExecutionContext):Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()])
    if(isPublic) { return true }
    
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if(!token) {
      throw new UnauthorizedException();
    }

    this.logger.log({
      module: 'auth',
      class: 'AuthGuard',
      method: 'canActivate',
      info: 'Got the token',
    })

    try {
      console.log(token)
      const payload = await this.jwtService.verifyAsync( token, { secret: 'haha' })
      console.log(payload)
      request['user'] = payload;
    } catch {
      this.logger.error({
        module: 'auth',
        class: 'AuthGuard',
        method: 'canActivate',
        info: 'Error while verifying token',
      });
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = typeof request.headers.authorization === 'string' ? request.headers.authorization.split(' ') : [];
    return type === 'Bearer' ? token : undefined;
  }
}