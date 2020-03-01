import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { Controller, Post, Body, ValidationPipe} from '@nestjs/common';


@Controller('auth')
export class AuthController {
    constructor(
        private authSevice: AuthService,
    ) {}

    @Post('/signup')
    signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto) {
        return this.authSevice.signUp(authCredentialsDto);
    }

    @Post('/signin')
    singIn(@Body (ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        return this.authSevice.signIn(authCredentialsDto);
    }
}