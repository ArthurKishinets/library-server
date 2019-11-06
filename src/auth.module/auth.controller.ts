import { Controller, Post, UseGuards, Request, ValidationPipe, UsePipes, Body, Response, ForbiddenException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup';
import { LoginDto } from './dto/LoginDto';
import { UsersService } from '../users.module/users.service';

@Controller('')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UsersService) { }

    @UsePipes(new ValidationPipe())
    @Post('auth/login')
    async login(@Body() loginReq: LoginDto) {
        const user = await this.authService.validateUser(loginReq.email, loginReq.password);
        if (!user) {
            throw new ForbiddenException('Incorrect email or password');
        }
        return this.authService.login(loginReq);
    }

    @UsePipes(new ValidationPipe())
    @Post('auth/signup')
    async signup(@Request() req, @Body() SignupDto: SignupDto, @Response() res) {
        let user;
        try {
            user = await this.usersService.createOne(SignupDto);
        } catch (e) {
            if (e.email === SignupDto.email) {
                return res.status(401).send({ error: 'User with such email is already exists' });
            } else {
                return res.status(401).send({ error: 'User with such username is already exists' });
            }
        }
        const { accessToken } = await this.authService.login(user);
        return res.status(201).send({...user, accessToken});
    }
}
