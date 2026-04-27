const { executeQuery } = require('../config/db');

const getAll = async (req, res) => {
  try {
    const result = await executeQuery('SELECT * FROM Centro_Eva ORDER BY ID_Centro');
    res.json(result.rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

const getById = async (req, res) => {
  try {
    const result = await executeQuery('SELECT * FROM Centro_Eva WHERE ID_Centro = :id', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'No encontrado' });
    res.json(result.rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

const create = async (req, res) => {
  const { ID_Centro, Nombre, Direccion, Calificacion, Depa_ID_Depa } = req.body;
  try {
    await executeQuery(
      'INSERT INTO Centro_Eva (ID_Centro, Nombre, Direccion, Calificacion, Depa_ID_Depa) VALUES (:1, :2, :3, :4, :5)',
      [ID_Centro, Nombre, Direccion, Calificacion || null, Depa_ID_Depa]
    );
    res.status(201).json({ mensaje: 'Centro de evaluación creado exitosamente' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

const update = async (req, res) => {
  const { Nombre, Direccion, Calificacion, Depa_ID_Depa } = req.body;
  try {
    const result = await executeQuery(
      'UPDATE Centro_Eva SET Nombre = :1, Direccion = :2, Calificacion = :3, Depa_ID_Depa = :4 WHERE ID_Centro = :5',
      [Nombre, Direccion, Calificacion || null, Depa_ID_Depa, req.params.id]
    );
    if (result.rowsAffected === 0) return res.status(404).json({ error: 'No encontrado' });
    res.json({ mensaje: 'Centro de evaluación actualizado exitosamente' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

const remove = async (req, res) => {
  try {
    const result = await executeQuery('DELETE FROM Centro_Eva WHERE ID_Centro = :id', [req.params.id]);
    if (result.rowsAffected === 0) return res.status(404).json({ error: 'No encontrado' });
    res.json({ mensaje: 'Centro de evaluación eliminado exitosamente' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

module.exports = { getAll, getById, create, update, remove };
