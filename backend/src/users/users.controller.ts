import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ValidatePayloadNotEmptyPipe } from '../common/pipes/validate-payload-not-empty.pipe';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUsersDto } from './dto/get-users.dto';
import { GetUsersResponseDto } from './response-dto/get-users.response-dto';
import { AuthInterceptor } from '../token/interceptors/auth.interceptor';
import { GetUserByIdResponseDto } from './response-dto/get-user-by-id.response-dto';
import { EmailAvailableGuard } from './guards/email-available.guard';
import { PhoneAvailableGuard } from './guards/phone-available.guard';
import { PositionExistsGuard } from './guards/position-exists.guard';
import { UserExistsGuard } from './guards/user-exists.guard';
import { TokenGuard } from '../token/guards/token.guard';
import { MAX_USER_PHOTO_SIZE } from './users.constants';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @UseGuards(
    TokenGuard,
    PhoneAvailableGuard,
    PositionExistsGuard,
    EmailAvailableGuard,
  )
  @UseInterceptors(AuthInterceptor)
  async createUser(
    @Body(ValidatePayloadNotEmptyPipe) createUserDto: CreateUserDto,
    @UploadedFile(
      'file',
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: 'image/jpeg' }),
          new MaxFileSizeValidator({ maxSize: MAX_USER_PHOTO_SIZE }),
        ],
      }),
    )
    file: Express.Multer.File,
  ): Promise<any> {
    return this.usersService.create(createUserDto, file);
  }

  @Get()
  async getAll(
    @Query() getUsersDto: GetUsersDto,
  ): Promise<GetUsersResponseDto> {
    return this.usersService.getUsers(getUsersDto);
  }

  @Get(':id')
  @UseGuards(UserExistsGuard)
  async getById(
    @Param('id', ParseIntPipe) userId: number,
  ): Promise<GetUserByIdResponseDto> {
    return this.usersService.getById(userId);
  }
}
