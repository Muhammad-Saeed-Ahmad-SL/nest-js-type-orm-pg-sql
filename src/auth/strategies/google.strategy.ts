import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import googleOauthConfig from 'src/config/google-oauth.config';
import { Role } from 'src/user/enums/role.enum';
import { UserService } from 'src/user/user.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    @Inject(googleOauthConfig.KEY)
    private readonly googleConfiguration: ConfigType<typeof googleOauthConfig>,
    private readonly userService: UserService,
  ) {
    super({
      clientID: googleConfiguration.clientId,
      clientSecret: googleConfiguration.clientSecret,
      callbackURL: googleConfiguration.callbackUrl,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ) {
    try {
      // Extract relevant Google profile information
      const { emails, displayName } = profile;

      if (!emails || emails.length === 0) {
        throw new Error('No email found in Google profile');
      }

      const email = emails[0].value; // Extract the primary email

      // Call UserService to validate or create the user
      const user = await this.userService.validateGoogleUser({
        email,
        name: displayName || 'Google User', // Fallback to 'Google User' if no name is provided
        password: '', // Google OAuth users do not need a password
        roles: [Role.Employee], // Default role for OAuth users
        contracts: [], // No contracts assigned initially
      });

      // Return the user to Passport for further processing
      done(null, user);
    } catch (error) {
      // Handle validation errors or unexpected issues
      done(error, null);
    }
  }
}
