import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entity/user.entity";
import { Repository } from "typeorm";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(User)
        private readonly repository: Repository<User>,
    ) {}

    async createUser(authCredentials: AuthCredentialsDto): Promise<void> {

        const { username, password } = authCredentials;

        const user = this.repository.create({
            username, 
            password
        });

        await this.repository.save(user);
    }

    async getByUsername(username: string): Promise<User> {
        return await this.repository.findOneBy({username});
    }

}