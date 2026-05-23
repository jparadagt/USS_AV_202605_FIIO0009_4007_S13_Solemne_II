const express = require('express');
const router = express.Router();

const pool = require('../db/connection');

router.get('/', async (req, res) => {

  try {

    const result = await pool.query(`
      SELECT
        id,
        title,
        description,
        status,
        priority,
        created_at AS "createdAt",
        due_date AS "dueDate"
      FROM tasks
      ORDER BY id DESC
    `);

    res.json(result.rows);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: 'Database error'
    });

  }

});

module.exports = router;