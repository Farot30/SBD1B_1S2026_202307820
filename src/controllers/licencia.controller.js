const { executeQuery } = require('../config/db');

const getAll = async (req, res) => {
  try {
    const result = await executeQuery('SELECT * FROM Licencia ORDER BY ID_Licencia');
    res.json(result.rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

const getById = async (req, res) => {
  try {
    const result = await executeQuery('SELECT * FROM Licencia WHERE ID_Licencia = :id', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'No encontrado' });
    res.json(result.rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

const create = async (req, res) => {
  const { ID_Licencia, Tipo_Licencia, Persona_ID_persona } = req.body;
  try {
    await executeQuery(
      'INSERT INTO Licencia (ID_Licencia, Tipo_Licencia, Persona_ID_persona) VALUES (:1, :2, :3)',
      [ID_Licencia, Tipo_Licencia, Persona_ID_persona]
    );
    res.status(201).json({ mensaje: 'Licencia creada exitosamente' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

const update = async (req, res) => {
  const { Tipo_Licencia, Persona_ID_persona } = req.body;
  try {
    const result = await executeQuery(
      'UPDATE Licencia SET Tipo_Licencia = :1, Persona_ID_persona = :2 WHERE ID_Licencia = :3',
      [Tipo_Licencia, Persona_ID_persona, req.params.id]
    );
    if (result.rowsAffected === 0) return res.status(404).json({ error: 'No encontrado' });
    res.json({ mensaje: 'Licencia actualizada exitosamente' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

const remove = async (req, res) => {
  try {
    const result = await executeQuery('DELETE FROM Licencia WHERE ID_Licencia = :id', [req.params.id]);
    if (result.rowsAffected === 0) return res.status(404).json({ error: 'No encontrado' });
    res.json({ mensaje: 'Licencia eliminada exitosamente' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

module.exports = { getAll, getById, create, update, remove };
