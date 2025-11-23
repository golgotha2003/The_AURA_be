import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Pool } from "pg";
import { PG_POOL } from "src/database/database.provider";
import { CreateBranchDto } from "./dto/create-branch.dto";
import { BranchEntity } from "./entities/branch.entity";
import { UpdateBranchDto } from "./dto/update-branch.dto";

@Injectable()
export class BranchRepository{
    constructor(@Inject(PG_POOL) private readonly pool: Pool) {}

    async create(branch: CreateBranchDto): Promise<BranchEntity> {
        const city = await this.pool.query('SELECT code FROM cities WHERE name = $1', [branch.city]);
        if(city.rowCount === 0) {
            throw new NotFoundException('Thành phố không tồn tại');
        }
        const query = 'INSERT INTO branches (name, address, city) VALUES ($1, $2, $3) RETURNING *';
        const result = await this.pool.query(query, [branch.name, branch.address, city.rows[0].code]);
        return result.rows[0];
    }

    async findAll(): Promise<BranchEntity[]> {
        const query = 'SELECT * FROM branches';
        const result = await this.pool.query(query);
        return result.rows;
    }

    async findOne(id: number): Promise<BranchEntity | null> {
        const query = 'SELECT * FROM branches WHERE id = $1';
        const result = await this.pool.query(query, [id]);
        return result.rows[0];
    }

    async update(id: number, branch: UpdateBranchDto): Promise<BranchEntity | null> {
        const city = await this.pool.query('SELECT code FROM cities WHERE name = $1', [branch.city]);
        if(city.rowCount === 0) {
            throw new NotFoundException('Thành phố không tồn tại');
        }
        const query = 'UPDATE branches SET name = $1, address = $2, city = $3, updated_at = NOW() WHERE id = $4 RETURNING *';
        const result = await this.pool.query(query, [branch.name, branch.address, city.rows[0].code, id]);
        return result.rows[0];
    }

    async delete(id: number): Promise<boolean> {
        const query = 'UPDATE branches SET is_closed = true, updated_at = NOW() WHERE id = $1 RETURNING *';
        const result = await this.pool.query(query, [id]);
        if (result.rowCount === 0) {
            return false;
        }
        return true;
    }

    async findByName(name: string): Promise<BranchEntity | null> {
        const query = 'SELECT * FROM branches WHERE name = $1';
        const result = await this.pool.query(query, [name]);
        return result.rows[0];
    }
}