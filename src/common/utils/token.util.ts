import { UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

const tokenValidator = async (
  token: string,
  secret: string = process.env.JWT_SECRET,
) => {
  try {
    console.log({ token, secret });
    
    const validated = jwt.verify(token, secret);
    return validated;
  } catch (error) {
    throw new UnauthorizedException('Invalid Link or link has expired');
  }
};

export default tokenValidator;
