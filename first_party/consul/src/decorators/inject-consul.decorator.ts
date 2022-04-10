import { Inject } from '@nestjs/common';
import { CONSUL } from '../consul.constants';

export const InjectConsul = () => Inject(CONSUL);
