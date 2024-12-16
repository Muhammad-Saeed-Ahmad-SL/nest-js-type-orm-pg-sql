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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard, RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Roles('admin') // Only admin can access this
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'List of users' })
  getAllUsers() {
    return this.userService.findAllUsers();
  }

  @Post()
  @Roles('admin') // Only admin can create users
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'User successfully created' })
  createUser(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }

  @Get('me')
  @ApiOperation({ summary: 'Get logged-in user' })
  @ApiResponse({ status: 200, description: 'Logged-in user' })
  getProfile(@Request() req: any) {
    return req.user; // Return logged-in user's info
  }

  @Patch(':id')
  @Roles('admin') // Only admin can create users
  @ApiOperation({ summary: 'Update user details' })
  @ApiParam({ name: 'id', type: 'string', description: 'User ID to update' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 200, description: 'User successfully updated' })
  updateUser(@Param('id') id: string, @Body() userDto: UpdateUserDto) {
    return this.userService.updateUser(id, userDto);
  }

  @Delete(':id')
  @Roles('admin') // Only admin can delete users
  @ApiOperation({ summary: 'Delete a user' })
  @ApiParam({ name: 'id', type: 'string', description: 'User ID to delete' })
  @ApiResponse({ status: 200, description: 'User successfully deleted' })
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
