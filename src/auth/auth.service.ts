import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository
    ) {}

    async signUp(authCredentials: AuthCredentialsDto): Promise<void> {

        var userAlreadyExists = await this.userRepository.getByUsername(authCredentials.username);
        if(userAlreadyExists){
            throw new ConflictException('Username already exists');
        }

        return this.userRepository.createUser(authCredentials);
    }

    async signIn(AuthCredentialsDto: AuthCredentialsDto): Promise<string> {
        const { username, password } = AuthCredentialsDto;

        const user = await this.userRepository.getByUsername(username);

        if(user && (await bcrypt.compare(password, user.password))){
            return 'success';
        } else {
            throw new UnauthorizedException('Unauthorized to SignIn');
        }
    }

}
