import { Controller, Post, Body ,UseGuards, Get, Req, Res} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtGuard } from './auth.guard';

@Controller('users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body('email') email: string, @Body('password') password: string, @Res({ passthrough: true }) response): Promise<{ token: string }> {
    const token = await this.authService.signup(email, password);
    response.cookie('user_token', token)
    return { token };
  }
4

  @Post('login')
  async login(@Body('email') email: string, @Body('password') password: string, @Res({ passthrough: true }) response: any): Promise<{ token: string }> {
    const token = await this.authService.login(email, password);
    response.cookie('user_token', token)
    return { token };
  }

    @UseGuards(JwtGuard)
    @Get('me')
    getProfile(@Req() req:any) {
      console.log(req)
      return req.user;
    }


    @Get('logout')
    async logout(@Res({ passthrough: true }) res:any) {
      res.cookie('user_token', '', { expires: new Date(Date.now()) });
      return {};
    }
}
