import { IsString, MinLength } from 'class-validator';

export class SignupDto {
    @MinLength(3, {
        message: "Username is too short"
    })
    @IsString()
    readonly username: string;

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