import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserRepository } from "./user.repository";
import { JwtPayload } from "./jwt-payload.interface";
import { User } from "./entity/user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private usersRepository: UserRepository,
    ) {
        super({
            secretOrKey: 'secretDoBoçaMeooo',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    async validate(payload: JwtPayload): Promise<User> {
        const { username } = payload;

        const user: User = await this.usersRepository.getByUsername(username);

        if(!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}