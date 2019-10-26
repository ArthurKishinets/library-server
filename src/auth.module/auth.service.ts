import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { UsersService } from '../users.module/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    private saltRounds: number = 11;
    constructor(
        @Inject(forwardRef(() => UsersService))
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {}

    async validateUser(username: string, pass: string): Promise<Object | null> {
        const user = await this.usersService.findOne(username);
        if (user && this.comparePasswords(user.password, pass)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async hashPassword(password: string) : Promise<string> {
        const hash = await bcrypt.hash(password, this.saltRounds);
        return hash;
    }

    async comparePasswords(hashedPassword: string, passwordCandidate: string) : Promise<string>{
        const result = bcrypt.compare(passwordCandidate, hashedPassword);
        return result;
    }
}
