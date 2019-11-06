import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Users } from './user.entity';
import { SignupDto } from '../auth.module/dto/signup';
import { AuthService } from '../auth.module/auth.service';

@Injectable()
export class UsersService {
    constructor(
        @Inject('USERS_REPOSITORY')
        private readonly userRepository: Repository<Users>,
        @Inject(forwardRef(() => AuthService))
        private readonly AuthService: AuthService
    ) { }

    async findOne(email: string): Promise<Users> {
        return await this.userRepository.findOne({ email });
    }

    async createOne(userObj: SignupDto): Promise<Users> | null {
        let existingUser = await this.userRepository.findOne({ where: [
            { username: userObj.username },
            { email: userObj.email }
        ]});
        if (existingUser) {
            throw existingUser;
        }
        const user = new Users();
        user.email = userObj.email;
        user.username = userObj.username;
        user.password = await this.AuthService.hashPassword(userObj.password);

        await this.userRepository.save(user);
        return user;
    }
}