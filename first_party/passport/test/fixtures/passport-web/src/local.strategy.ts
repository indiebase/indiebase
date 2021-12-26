/**
 * Copyright (C) 2021 Nawbc
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 * 
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import { BootStrategy } from '../../../../src/decorators';
import { WebPassportStrategyAdapter } from '../../../../src';
import { Strategy } from 'passport-local';

@BootStrategy()
export class LocalStrategy extends WebPassportStrategyAdapter(
  Strategy,
  'local'
) {
  async verify(username, password) {
    return {
      username,
      password,
    };
  }
}

@BootStrategy({
  async useParams() {
    return {
      passwordField: 'pwd',
    };
  },
})
export class LocalStrategy2 extends WebPassportStrategyAdapter(
  Strategy,
  'local2'
) {
  async verify(username, password) {
    return {
      username,
      password,
    };
  }
}
