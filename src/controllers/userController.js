const { pool } = require("../configs/db.config");

const getUsers = (req, res) => {
  pool.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query("SELECT * FROM users WHERE id=$1", [id], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).json(result.rows);
  });
};

const filterUser = (req, res) => {
  const lastName = req.params.lastName;
  pool.query(
    "SELECT * FROM users WHERE lastname ILIKE ('%' || $1 || '%')",[lastName],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).json(result.rows);
    }
  );
};

const createUser = (req, res) => {
  const { firstName, lastName, contacts } = req.body;
  pool.query(
    "INSERT INTO users (firstName, lastName, contacts) VALUES ($1,$2,$3) RETURNING *",
    [firstName, lastName, contacts],
    (error, result) => {
      if (error) {
        throw error;
      }
      res
        .status(201)
        .send(`user created successfully with id ${result.rows[0].id}`);
    }
  );
};

const updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  const { firstName, lastName, contacts } = req.body;
  pool.query(
    "UPDATE users SET firstName =$1, lastName=$2, contacts=$3 WHERE id=$4",
    [firstName, lastName, contacts,id],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).send(`user updated with ID: ${id}`);
    }
  );
};

const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query("DELETE FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).send(`User deleted with ID: ${id}`);
  });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  filterUser,
};
