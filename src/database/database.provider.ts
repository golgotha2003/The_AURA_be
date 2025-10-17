import { Provider } from '@nestjs/common';
import { Pool } from 'pg';

export const PG_POOL = 'PG_POOL';

export const databaseProvider: Provider[] = [
  {
    provide: PG_POOL,
    useFactory: () => {
      return new Pool({
        host: process.env.POSTGRES_HOST,
        port: parseInt(process.env.POSTGRES_PORT ?? '5432'),
        user: process.env.POSTGRES_USERNAME,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        max: 20
      });
    },
  },
];
