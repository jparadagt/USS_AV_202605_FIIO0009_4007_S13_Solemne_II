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

router.get('/:id', async (req, res) => {

  try {

    const { id } = req.params;

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
      WHERE id = $1
    `,
    [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({
        error: 'Task not found'
      });
    }

    res.json(result.rows[0]);

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

router.put('/:id', async (req, res) => {

  try {

    const { id } = req.params;
    const {
      title,
      description,
      status,
      priority,
      dueDate
    } = req.body;

    const result = await pool.query(`
      UPDATE tasks
      SET
        title = $1,
        description = $2,
        status = $3,
        priority = $4,
        due_date = $5
      WHERE id = $6
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
      dueDate,
      id
    ]);

    if (result.rowCount === 0) {
      return res.status(404).json({
        error: 'Task not found'
      });
    }

    res.json(result.rows[0]);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: 'Database error'
    });

  }

});

router.delete('/:id', async (req, res) => {

  try {

    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM tasks WHERE id = $1',
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        error: 'Task not found'
      });
    }

    res.status(204).send();

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: 'Database error'
    });

  }

});

module.exports = router;
