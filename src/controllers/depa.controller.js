const { executeQuery } = require('../config/db');

const getAll = async (req, res) => {
  try {
    const result = await executeQuery('SELECT * FROM Depa ORDER BY ID_Depa');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const result = await executeQuery(
      'SELECT * FROM Depa WHERE ID_Depa = :id',
      [req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'No encontrado' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const create = async (req, res) => {
  const { ID_Depa, Nombre } = req.body;
  try {
    await executeQuery(
      'INSERT INTO Depa (ID_Depa, Nombre) VALUES (:1, :2)',
      [ID_Depa, Nombre]
    );
    res.status(201).json({ mensaje: 'Departamento creado exitosamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const update = async (req, res) => {
  const { Nombre } = req.body;
  try {
    const result = await executeQuery(
      'UPDATE Depa SET Nombre = :1 WHERE ID_Depa = :2',
      [Nombre, req.params.id]
    );
    if (result.rowsAffected === 0) return res.status(404).json({ error: 'No encontrado' });
    res.json({ mensaje: 'Departamento actualizado exitosamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const remove = async (req, res) => {
  try {
    const result = await executeQuery(
      'DELETE FROM Depa WHERE ID_Depa = :id',
      [req.params.id]
    );
    if (result.rowsAffected === 0) return res.status(404).json({ error: 'No encontrado' });
    res.json({ mensaje: 'Departamento eliminado exitosamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAll, getById, create, update, remove };
