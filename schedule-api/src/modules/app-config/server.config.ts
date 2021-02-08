export class ServerConfig {
  appName: string;
  publicUrl: string;
  port: number;
  jwtSecret: string;
  jwtExpirationTime: number;
  jwtRefreshTokenSecret: string;
  jwtRefreshTokenExpirationTime: string;
}
