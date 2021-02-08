import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import UserDto, { UserStatus } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import User from '../../entities/user.entity';
import { Repository, MoreThanOrEqual } from 'typeorm';
import { CrudHelper } from '../../utils/crud-helper';
import * as bcrypt from 'bcrypt';
import { PageOrderType } from '../../utils/types/pagination-params';
import PaginatedResponseDto from '../../common/shared-dto/paginated-response.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getAll(
    page = 0,
    size = 10,
    orderDirection: PageOrderType,
    orderBy: string,
  ): Promise<PaginatedResponseDto> {
    const skip = page * size;
    const [items, count] = await this.usersRepository.findAndCount({
      order: { [orderBy || 'id']: orderDirection || 'ASC' },
      skip,
      take: size,
    });
    return { items, numOfAllItems: count };
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
    const user = await this.usersRepository.findOne(id, {
      relations: ['events'],
    });
    if (user) {
      return user;
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  async activateUser(token: string) {
    const user = await this.usersRepository.findOne({
      where: {
        activationToken: token,
        activationTokenExpiration: MoreThanOrEqual(new Date()),
      },
    });
    console.log(new Date(), user?.activationTokenExpiration);
    if (!user) {
      throw new HttpException(
        'Wrong activation token or token has expired',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(id: number, userDto: UserDto): Promise<UserDto> {
    const updateUser = this.usersRepository.create(userDto);
    await this.usersRepository.update(id, updateUser);
    const updatedUser = await this.usersRepository.findOne(id, {
      relations: ['events'],
    });
    if (updatedUser) {
      return updatedUser;
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  async create(userDto: UserDto): Promise<UserDto> {
    CrudHelper.idShouldBeUndefined(userDto.id);
    userDto.status = UserStatus.PENDING;
    const newUser = this.usersRepository.create(userDto);
    await this.usersRepository.save(newUser);
    return newUser;
  }

  async delete(id: number): Promise<void> {
    const deleteResponse = await this.usersRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  async setCurrentRefreshToken(
    refreshToken: string,
    userId: number,
  ): Promise<void> {
    const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.usersRepository.update(userId, {
      currentHashedRefreshToken,
    });
  }

  async getUserIfRefreshTokenMatches(
    refreshToken: string,
    userId: number,
  ): Promise<UserDto> {
    const user = await this.getById(userId);

    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      user.currentHashedRefreshToken,
    );

    if (isRefreshTokenMatching) {
      return user;
    }
  }

  async removeRefreshToken(userId: number) {
    return this.usersRepository.update(userId, {
      currentHashedRefreshToken: null,
    });
  }
}
