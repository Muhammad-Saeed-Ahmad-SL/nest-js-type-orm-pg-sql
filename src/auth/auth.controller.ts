import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { GoogleAuthGuard } from './guards/google-auth.guard';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login user and get JWT token' })
  @ApiBody({
    description: 'User credentials to login',
    type: LoginDto, // Use the DTO here
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully logged in',
    schema: {
      example: {
        access_token: 'string',
      },
    },
  })
  async login(@Body() loginDto: LoginDto) {
    const { email, password } = loginDto;
    return this.authService.login(email, password);
  }

  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  @ApiOperation({ summary: 'Redirect to Google OAuth login page' })
  async googleLogin() {
    // Redirect to Google OAuth login page
  }

  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  @ApiOperation({ summary: 'Google OAuth callback' })
  @ApiResponse({
    status: 200,
    description: 'Successfully authenticated with Google',
    schema: {
      example: {
        access_token: 'string',
      },
    },
  })
  async googleCallback(@Req() req, @Res() res) {
    const user = req.user;

    const payload = {
      id: user.id,
      email: user.email,
      roles: user.roles,
    };
    const access_token = await this.authService.getJwtToken(payload);

    res.redirect('http://localhost:3000/user/me');
    // Issue JWT using AuthService
    return {
      access_token,
      payload,
    };
  }
}
