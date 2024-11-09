import { ConflictException, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository
    ) {}

    async signUp(authCredentials: AuthCredentialsDto): Promise<void> {

        var userAlreadyExists = this.userRepository.getByUsername(authCredentials.username);
        if(userAlreadyExists){
            throw new ConflictException('Username already exists');
        }

        return this.userRepository.createUser(authCredentials);
    }
}
