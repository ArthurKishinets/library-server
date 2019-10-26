import { Controller, Post, UseGuards, Request, ValidationPipe, UsePipes, Body, Response } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup';
import { UsersService } from '../users.module/users.service';

@Controller('')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UsersService) { }

    @UseGuards(AuthGuard('local'))
    @Post('auth/login')
    async login(@Request() req) {
        return this.authService.login(req.user);
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
        return res.status(201).send(user);
    }
}
