const { executeQuery } = require('../config/db');

const getAll = async (req, res) => {
  try {
    const result = await executeQuery('SELECT * FROM Municipio ORDER BY ID_Municipio');
    res.json(result.rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

const getById = async (req, res) => {
  try {
    const result = await executeQuery('SELECT * FROM Municipio WHERE ID_Municipio = :id', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'No encontrado' });
    res.json(result.rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

const create = async (req, res) => {
  const { ID_Municipio, Nombre, Depa_ID_Depa } = req.body;
  try {
    await executeQuery(
      'INSERT INTO Municipio (ID_Municipio, Nombre, Depa_ID_Depa) VALUES (:1, :2, :3)',
      [ID_Municipio, Nombre, Depa_ID_Depa]
    );
    res.status(201).json({ mensaje: 'Municipio creado exitosamente' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

const update = async (req, res) => {
  const { Nombre, Depa_ID_Depa } = req.body;
  try {
    const result = await executeQuery(
      'UPDATE Municipio SET Nombre = :1, Depa_ID_Depa = :2 WHERE ID_Municipio = :3',
      [Nombre, Depa_ID_Depa, req.params.id]
    );
    if (result.rowsAffected === 0) return res.status(404).json({ error: 'No encontrado' });
    res.json({ mensaje: 'Municipio actualizado exitosamente' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

const remove = async (req, res) => {
  try {
    const result = await executeQuery('DELETE FROM Municipio WHERE ID_Municipio = :id', [req.params.id]);
    if (result.rowsAffected === 0) return res.status(404).json({ error: 'No encontrado' });
    res.json({ mensaje: 'Municipio eliminado exitosamente' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

module.exports = { getAll, getById, create, update, remove };
