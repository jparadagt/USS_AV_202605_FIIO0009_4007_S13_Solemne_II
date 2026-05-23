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

router.post('/', async (req, res) => {

  try {

    const {
      title,
      description,
      status,
      priority,
      createdAt,
      dueDate
    } = req.body;

    const result = await pool.query(`
      INSERT INTO tasks (
        title,
        description,
        status,
        priority,
        created_at,
        due_date
      )
      VALUES ($1,$2,$3,$4,$5,$6)
      RETURNING
        id,
        title,
        description,
        status,
        priority,
        created_at AS "createdAt",
        due_date AS "dueDate"
    `,
    [
      title,
      description,
      status,
      priority,
      createdAt,
      dueDate
    ]);

    res.status(201).json(result.rows[0]);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: 'Database error'
    });

  }

});

module.exports = router;