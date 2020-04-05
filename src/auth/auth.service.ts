import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserRepository } from './user.repository';
import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    private logger = new Logger('AuthService');
    constructor(
        @InjectRepository(UserRepository)
        private userRepository:  UserRepository,
        private jwtService: JwtService,
    ) {}

     async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.userRepository.signUp(authCredentialsDto);
    }

    async signIn(authCredentioals: AuthCredentialsDto): Promise<{ accessToken: string }> {
        const username = await this.userRepository.validateUserPassword(authCredentioals);

        if(!username) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const payload: JwtPayload = {username};
        const accessToken = await this.jwtService.sign(payload);
        this.logger.debug(`Generated JWT Token with payload ${JSON.stringify(payload)}`);   

        return {accessToken};
    }

    
}