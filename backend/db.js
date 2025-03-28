import Knex from 'knex';
import knexConfig from './knexfile.js';
import dotenv from 'dotenv';

dotenv.config(); 

const knex = Knex(knexConfig);

export default knex;
