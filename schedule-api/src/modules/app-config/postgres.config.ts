export class PostgresConfig {
  user: string;
  password: string;
  database: string;
  host: string;
  port: number;
  ssl: boolean;
  synchronizeSchema: boolean;
  dropSchema: boolean;
  logSQL: boolean;
}
