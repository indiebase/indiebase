import { registerAs } from '@nestjs/config';
export default registerAs('common', () => ({
  netSpeedLimitMax: parseInt(process.env.NET_SPEED_LIMIT_MAX),
  ownerName: process.env.OWNER_NAME,
  ownerPassword: process.env.OWNER_PASSWORD,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
}));
