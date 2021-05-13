import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator'
import { getRepository, Repository } from 'typeorm';
import { CreateUserDto, LoginUserDto } from './dto';
import { User } from './users.entity';
import { UserRO } from './users.interface';
import { SECRET } from '../config';
const jwt = require('jsonwebtoken');
import * as argon2 from 'argon2';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async findOne({username, password}: LoginUserDto): Promise<User> {
        const user = await this.userRepository.findOne({username});
        if (!user) {
            return null;
        }

        if (await argon2.verify(user.password, password)) {
            return user;
        }

        return null;
    }

    async findById(id: number): Promise<UserRO> {
        const user = await this.userRepository.findOne(id);

        if (!user) {
            const errors = {User: ' not found'};
            throw new HttpException({errors}, 401);
        }

        return this.buildUserRO(user);
    }

    async create(dto: CreateUserDto): Promise<UserRO> {
        const {username, password} = dto;
        const qb = await getRepository(User)
        .createQueryBuilder('user')
        .where('user.username = :username', {username})

        const user = await qb.getOne();

        if (user) {
            const errors = {username: 'Username already exist'};
            throw new HttpException({message: 'Input data validation failed', errors}, HttpStatus.BAD_REQUEST);
        }

        let newUser = new User();
        newUser.username = username;
        newUser.password = password;
        newUser.wins = 0;
        newUser.loses = 0;
        newUser.winstreak = 0;

        const errors = await validate(newUser);
        if (errors.length > 0) {
            const _errors = {username: 'Userinput is not valid.'};
            throw new HttpException({message: 'Input data validation failed', _errors}, HttpStatus.BAD_REQUEST);
        } else {
            const savedUser = await this.userRepository.save(newUser);
            return this.buildUserRO(savedUser);
        }
    }

    async remove(id: string): Promise<void> {
        await this.userRepository.delete(id);
    }

    public generateJWT(user) {
        let today = new Date();
        let exp = new Date(today);
        exp.setDate(today.getDate() + 60);

        return jwt.sign({
            id: user.id,
            username: user.username,
            exp: exp.getTime() / 1000,
        }, SECRET);
    };

    private buildUserRO(user: User) {
        const userRO = {
          id: user.id,
          username: user.username,
          wins: user.wins,
          loses: user.loses,
          winstreak: user.winstreak,
          token: this.generateJWT(user)
        };
    
        return {user: userRO};
      }
}