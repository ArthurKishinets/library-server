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

    async validateUser(email: string, pass: string): Promise<Object | null> {
        const user = await this.usersService.findOne(email);
        const passwordValid = await this.comparePasswords(user.password, pass);
        if (user && passwordValid) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.userId };
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }

    async hashPassword(password: string) : Promise<string> {
        const hash = await bcrypt.hash(password, this.saltRounds);
        return hash;
    }

    async comparePasswords(hashedPassword: string, passwordCandidate: string) : Promise<string>{
        const result = await bcrypt.compare(passwordCandidate, hashedPassword);
        return result;
    }
}
