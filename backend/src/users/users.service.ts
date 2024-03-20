import { Injectable } from '@nestjs/common';
import { UsersRepositoryService } from '../repositories/users/users-repository.service';
import { CreateUserResponseDto } from './response-dto/create-user.response-dto';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUsersDto } from './dto/get-users.dto';
import { GetUsersResponseDto } from './response-dto/get-users.response-dto';
import { plainToInstance } from 'class-transformer';
import { ILinks } from './interfaces/links.interface';
import { ConfigService } from '@nestjs/config';
import { ImagesService } from '../images/images.service';
import { GetUserByIdResponseDto } from './response-dto/get-user-by-id.response-dto';

@Injectable()
export class UsersService {
  private host: string;

  constructor(
    private usersRepositoryService: UsersRepositoryService,
    private imagesService: ImagesService,
    private configService: ConfigService,
  ) {
    this.host = this.configService.get<string>('host');
  }

  async create(
    { name, phone, email, position_id }: CreateUserDto,
    photo: Express.Multer.File,
  ): Promise<CreateUserResponseDto> {
    const photoUrl = await this.imagesService.compressImage(photo.buffer);

    const user = await this.usersRepositoryService.create({
      name,
      phone,
      email,
      positionId: position_id,
      photo: photoUrl,
    });

    return plainToInstance(CreateUserResponseDto, {
      user_id: user.id,
    });
  }

  private createGetUsersLink(urlSearchParams: URLSearchParams): string {
    return this.host + '/users?' + urlSearchParams.toString();
  }

  private composeGetUsersLinks(
    getUsersDto: GetUsersDto,
    totalPages: number,
  ): ILinks {
    const { page } = getUsersDto;

    const links: ILinks = {
      next_url: null,
      prev_url: null,
    };

    const urlSearchParams = new URLSearchParams(Object.entries(getUsersDto));

    if (page > 1) {
      urlSearchParams.set('page', String(Math.min(page - 1, totalPages)));

      links.prev_url = this.createGetUsersLink(urlSearchParams);
    }

    if (page < totalPages) {
      urlSearchParams.set('page', String(Math.min(page + 1)));

      links.next_url = this.createGetUsersLink(urlSearchParams);
    }

    return links;
  }

  async getUsers(getUsersDto: GetUsersDto): Promise<GetUsersResponseDto> {
    const { items: users, count } =
      await this.usersRepositoryService.getUsers(getUsersDto);

    const totalPages = Math.ceil(count / getUsersDto.per_page);

    return plainToInstance(GetUsersResponseDto, {
      page: getUsersDto.page,
      total_pages: totalPages,
      total_users: count,
      count: users.length,
      links: this.composeGetUsersLinks(getUsersDto, totalPages),
      users,
    });
  }

  async getById(userId: number): Promise<GetUserByIdResponseDto> {
    const user = await this.usersRepositoryService.getById(userId);

    return plainToInstance(GetUserByIdResponseDto, {
      user,
    });
  }
}
