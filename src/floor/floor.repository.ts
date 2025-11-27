import { Inject } from "@nestjs/common";
import { Pool } from "pg";
import { PG_POOL } from "src/database/database.provider";
import { FloorRequestDto } from "./dto/floor_request.dto";
import { FloorEntity } from "./entities/floor.entity";

export class FloorRepository {
    constructor(@Inject(PG_POOL) private readonly pool: Pool) {}

    async create(floor: FloorRequestDto): Promise<FloorEntity> {
        const query = 'INSERT INTO floors (name, description, branch_id) VALUES ($1, $2, $3) RETURNING *';
        const result = await this.pool.query(query, [floor.name, floor.description, floor.branch_id]);
        return result.rows[0];
    }

    async findAll(): Promise<FloorEntity[]> {
        const query = 'SELECT * FROM floors WHERE is_closed = FALSE';
        const result = await this.pool.query(query);
        return result.rows;
    }

    async findOne(id: number): Promise<FloorEntity | null> {
        const query = 'SELECT * FROM floors WHERE id = $1 AND is_closed = FALSE';
        const result = await this.pool.query(query, [id]);
        return result.rows[0] || null;
    }

    async findByName(name: string): Promise<FloorEntity | null> {
        const query = 'SELECT * FROM floors WHERE name = $1 AND is_closed = FALSE';
        const result = await this.pool.query(query, [name]);
        return result.rows[0] || null;
    }

    async update(id: number, floor: FloorRequestDto): Promise<FloorEntity | null> {
        const query = 'UPDATE floors SET name = $1, description = $2, branch_id = $3, updated_at = NOW() WHERE id = $4 AND is_closed = FALSE RETURNING *';
        const result = await this.pool.query(query, [floor.name, floor.description, floor.branch_id, id]);
        return result.rows[0] || null;
    }

    async delete(id: number): Promise<boolean> {
        const query = 'UPDATE floors SET is_closed = TRUE, updated_at = NOW() WHERE id = $1 AND is_closed = FALSE RETURNING *';
        const result = await this.pool.query(query, [id]);
        return result.rows[0] != null ? true : false;
    }

    async deleteAllByBranch(branch: number): Promise<boolean> {
        const query = 'UPDATE floors SET is_closed = TRUE, updated_at = NOW() WHERE branch_id = $1 AND is_closed = FALSE RETURNING *';
        const result = await this.pool.query(query, [branch]);
        if (result.rowCount === 0) {
            return false;
        }
        return true;
    }

    async findByBranch(branch: number): Promise<FloorEntity[]> {
        const query = 'SELECT * FROM floors WHERE branch_id = $1 AND is_closed = FALSE';
        const result = await this.pool.query(query, [branch]);
        return result.rows;
    }
}