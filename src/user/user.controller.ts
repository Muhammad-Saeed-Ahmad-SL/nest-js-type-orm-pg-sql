import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UseGuards,
  Request,
  Patch,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { AuthGuard } from '../auth/guards/auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
@UseGuards(AuthGuard, RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Roles('admin') // Only admin can access this
  getAllUsers() {
    return this.userService.findAllUsers();
  }

  @Post()
  @Roles('admin') // Only admin can create users
  createUser(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }

  @Get('me')
  getProfile(@Request() req: any) {
    return req.user; // Return logged-in user's info
  }

  @Patch(':id')
  @Roles('admin') // Only admin can create users
  updateUser(@Param('id') id: string, @Body() userDto: UpdateUserDto) {
    return this.userService.updateUser(id, userDto);
  }

  @Delete(':id')
  @Roles('admin') // Only admin can delete users
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
