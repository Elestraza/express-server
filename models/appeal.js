const pool = require('../cfg/db');

class Appeal {
    static async create({ subject, text }) {
        const result = await pool.query(
            'INSERT INTO appeals (subject, text) VALUES ($1, $2) RETURNING *',
            [subject, text]
        );
        return result.rows[0];
    }

    static async updateStatus(id, status, solution = undefined, cancelReason = undefined) {
        const query = `
            UPDATE appeals 
            SET status = $1, 
                solution = COALESCE($2, solution), 
                cancel_reason = COALESCE($3, cancel_reason), 
                updated_at = CURRENT_TIMESTAMP 
            WHERE id = $4 
            RETURNING *`;
    
        const result = await pool.query(query, [status, solution, cancelReason, id]);
        return result.rows[0];
    }

    static async getAll(filters = {}) {
        const { startDate, endDate } = filters;
        let query = 'SELECT * FROM appeals WHERE 1=1';
        const params = [];

        if (startDate) {
            query += ` AND created_at >= $${params.length + 1}`;
            params.push(startDate);
        }

        if (endDate) {
            query += ` AND created_at <= $${params.length + 1}`;
            params.push(endDate);
        }

        query += ' ORDER BY created_at DESC';

        const result = await pool.query(query, params);
        return result.rows;
    }

    static async cancelAllInProgress() {
        const result = await pool.query(
            'UPDATE appeals SET status = $1, cancel_reason = $2 WHERE status = $3 RETURNING *',
            ['Отменено', 'Отменено по системной ошибке', 'В работе']
        );
        return result.rows;
    }
}

module.exports = Appeal;