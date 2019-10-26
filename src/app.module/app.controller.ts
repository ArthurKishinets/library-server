import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
// import { AppService } from './app.service';

@Controller()
export class AppController {
    @UseGuards(AuthGuard('jwt'))
    @Get('/profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
