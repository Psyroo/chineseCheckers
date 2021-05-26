import { Body, Controller, Get, HttpException, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from './dto';
import { User } from './users.entity';
import { UserRO } from './users.interface';
import { UsersService } from './users.service';

@Controller('User')
export class UsersController {

    constructor(private readonly userService: UsersService) {}

    @Get()
    async findAll(): Promise<User[]> {
        return await this.userService.findAll()
    }

    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<UserRO> {
        return this.userService.create(createUserDto);
    }

    @UsePipes(new ValidationPipe())
    @Post('login')
    async login(@Body('user') loginUserDto: LoginUserDto): Promise<UserRO> {
        const _user = await this.userService.findOne(loginUserDto);

        const errors = { User: ' not found'};
        if (!_user) throw new HttpException({errors}, 401);

        const token = await this.userService.generateJWT(_user);
        const {username, wins, loses, winstreak} = _user;
        const user = {username, token, wins, loses, winstreak};
        return {user};
    }
}