import { Model } from 'sequelize-typescript';

import * as M from './model';

export default M;

const isModel = (m: any): m is typeof Model => m.prototype instanceof Model;
export const models = Object.values(M).filter(isModel);
