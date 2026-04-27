const { executeQuery } = require('../config/db');

const getAll = async (req, res) => {
  try {
    const result = await executeQuery('SELECT * FROM Instructor ORDER BY ID_instructor');
    res.json(result.rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

const getById = async (req, res) => {
  try {
    const result = await executeQuery('SELECT * FROM Instructor WHERE ID_instructor = :id', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'No encontrado' });
    res.json(result.rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

const create = async (req, res) => {
  const { ID_instructor, Nombre, Dar_Instruc } = req.body;
  try {
    await executeQuery(
      'INSERT INTO Instructor (ID_instructor, Nombre, Dar_Instruc) VALUES (:1, :2, :3)',
      [ID_instructor, Nombre, Dar_Instruc]
    );
    res.status(201).json({ mensaje: 'Instructor creado exitosamente' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

const update = async (req, res) => {
  const { Nombre, Dar_Instruc } = req.body;
  try {
    const result = await executeQuery(
      'UPDATE Instructor SET Nombre = :1, Dar_Instruc = :2 WHERE ID_instructor = :3',
      [Nombre, Dar_Instruc, req.params.id]
    );
    if (result.rowsAffected === 0) return res.status(404).json({ error: 'No encontrado' });
    res.json({ mensaje: 'Instructor actualizado exitosamente' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

const remove = async (req, res) => {
  try {
    const result = await executeQuery('DELETE FROM Instructor WHERE ID_instructor = :id', [req.params.id]);
    if (result.rowsAffected === 0) return res.status(404).json({ error: 'No encontrado' });
    res.json({ mensaje: 'Instructor eliminado exitosamente' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

module.exports = { getAll, getById, create, update, remove };
