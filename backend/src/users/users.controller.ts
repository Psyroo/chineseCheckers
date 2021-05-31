import { Body, Controller, Get, HttpException, Post, UsePipes, ValidationPipe, Param, Put, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from './dto';
import { User } from './users.entity';
import { UserRO } from './users.interface';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('user')
export class UsersController {

    constructor(private readonly userService: UsersService) {}

    @Get()
    async findAll(): Promise<User[]> {
        return await this.userService.findAll()
    }

    @Get('/me/:id')
    async findMe(@Param('id') id: number) : Promise<UserRO> {
        return await this.userService.findById(id)
    }

    @Post()
    async create(@Body('user') createUserDto: CreateUserDto): Promise<UserRO> {
        return this.userService.create(createUserDto);
    }

    @Put('/:id')
    async updateStat(@Param('id') id: number, @Body('user') updateUserDto: UpdateUserDto): Promise<User> {
        return this.userService.updateStat(id, updateUserDto);
    }

    @Delete('/:id')
    async delete(@Param('id') id: number): Promise<void> {
        await this.userService.remove(id);
    }

    @UsePipes(new ValidationPipe())
    @Post('login')
    async login(@Body('user') loginUserDto: LoginUserDto): Promise<UserRO> {
        const _user = await this.userService.findOne(loginUserDto);

        const errors = { User: ' not found'};
        if (!_user) throw new HttpException({errors}, 401);

        const token = await this.userService.generateJWT(_user);
        const {username, wins, loses, winstreak, id} = _user;
        const user = {username, token, wins, loses, winstreak, id};
        return {user};
    }
}