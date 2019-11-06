import { IsString, MinLength } from 'class-validator';

export class LoginDto {
    @MinLength(3, {
        message: "Email is too short"
    })
    @IsString()
    readonly email: string;

    @MinLength(3, {
        message: "Password is too short"
    })
    @IsString()
    readonly password: string;
}