import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import UserDto from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CrudHelper } from 'src/utils/crud-helper';

@Injectable()
export class UsersService {
  private lastUserId = 0;
  private users: User[] = [];

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getAll(): Promise<UserDto[]> {
    return await this.usersRepository.find();
  }

  async getByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({ email });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this email does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async getById(id: number): Promise<UserDto> {
    const user = await this.usersRepository.findOne(id);
    if (user) {
      return user;
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  async update(id: number, userDto: UserDto): Promise<UserDto> {
    const updateUser = this.usersRepository.create(userDto);
    await this.usersRepository.update(id, updateUser);
    const updatedUser = await this.usersRepository.findOne(id);
    if (updatedUser) {
      delete updatedUser.password;
      return updatedUser;
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  async create(userDto: UserDto): Promise<UserDto> {
    CrudHelper.idShouldBeUndefined(userDto.id);
    const newUser = await this.usersRepository.create(userDto);
    await this.usersRepository.save(newUser);
    delete newUser.password;
    return newUser;
  }

  async delete(id: number) {
    const deleteResponse = await this.usersRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }
}
