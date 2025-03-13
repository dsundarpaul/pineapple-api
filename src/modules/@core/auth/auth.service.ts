import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
// import { CreateAuthDto } from './dto/create-auth.dto';
// import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserService } from '@/modules/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@/modules/user/entities/user.entity';
import { ProductsService } from '@/modules/products/products.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  private readonly logger = new Logger(UserService.name);
  
  /**
   * 🛑🛑Currently this is method is not maintained. If u are usign this, this service mostly will not work
   * @param email 
   * @param pass 
   * @returns 
   */
  async signIn(email: string, pass: string): Promise<{ access_token: string, user: User}>{
    const user = await this.userService.findOne(email, pass);
    return { access_token: '', user }
    // console.assert(user.products[0].id, 'Product not found for this user');

    // if(user?.password !== pass) {
    //   this.logger.log({
    //     module: 'auth',
    //     class: 'AuthService',
    //     method: 'signIn',
    //     info: 'Invalid password',
    //     data: { email, pass }
    //   })
    //   throw new UnauthorizedException();
    // }

    // const payload = { sub: user.id, username: user.name, productId: user.products[0].id };
    // return {
    //   access_token: await this.jwtService.signAsync(payload),
    //   user
    // }
  }
}
