const { executeQuery } = require('../config/db');

const getAll = async (req, res) => {
  try {
    const result = await executeQuery('SELECT * FROM Esc_Auto ORDER BY ID_auto');
    res.json(result.rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

const getById = async (req, res) => {
  try {
    const result = await executeQuery('SELECT * FROM Esc_Auto WHERE ID_auto = :id', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'No encontrado' });
    res.json(result.rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

const create = async (req, res) => {
  const { ID_auto, Nombre, Direccion, Num_Autoriza } = req.body;
  try {
    await executeQuery(
      'INSERT INTO Esc_Auto (ID_auto, Nombre, Direccion, Num_Autoriza) VALUES (:1, :2, :3, :4)',
      [ID_auto, Nombre, Direccion, Num_Autoriza]
    );
    res.status(201).json({ mensaje: 'Escuela creada exitosamente' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

const update = async (req, res) => {
  const { Nombre, Direccion, Num_Autoriza } = req.body;
  try {
    const result = await executeQuery(
      'UPDATE Esc_Auto SET Nombre = :1, Direccion = :2, Num_Autoriza = :3 WHERE ID_auto = :4',
      [Nombre, Direccion, Num_Autoriza, req.params.id]
    );
    if (result.rowsAffected === 0) return res.status(404).json({ error: 'No encontrado' });
    res.json({ mensaje: 'Escuela actualizada exitosamente' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

const remove = async (req, res) => {
  try {
    const result = await executeQuery('DELETE FROM Esc_Auto WHERE ID_auto = :id', [req.params.id]);
    if (result.rowsAffected === 0) return res.status(404).json({ error: 'No encontrado' });
    res.json({ mensaje: 'Escuela eliminada exitosamente' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

module.exports = { getAll, getById, create, update, remove };
