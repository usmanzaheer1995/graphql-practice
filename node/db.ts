import { Pool } from 'pg';

export class DB {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      user: 'postgres',
      host: 'localhost',
      database: 'test_connect',
      password: 'usman123',
      port: 5432,
    });
  }

  async find(text: string, params: any[] = []): Promise<any[]> {
    const res = await this.pool.query(text, params);
    return res.rows;
  }

  async findOne<T>(text: string, params: any[] = []): Promise<T> {
    const res = await this.find(text, params);
    return res[0] ?? null;
  }
}
