import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository,
        private jwtService: JwtService
    ) {}

    async signUp(authCredentials: AuthCredentialsDto): Promise<void> {

        var userAlreadyExists = await this.userRepository.getByUsername(authCredentials.username);
        if(userAlreadyExists){
            throw new ConflictException('Username already exists');
        }

        return await this.userRepository.createUser(authCredentials);
    }

    async signIn(AuthCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        const { username, password } = AuthCredentialsDto;

        const user = await this.userRepository.getByUsername(username);

        if(user && (await bcrypt.compare(password, user.password))){

            const payload: JwtPayload = { username };
            const accessToken: string = await this.jwtService.sign(payload);

            return { accessToken }
        } else {
            throw new UnauthorizedException('Unauthorized to SignIn');
        }
    }

}
