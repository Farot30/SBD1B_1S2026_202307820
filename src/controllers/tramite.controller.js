const { executeQuery } = require('../config/db');

const getAll = async (req, res) => {
  try {
    const result = await executeQuery('SELECT * FROM Tramite ORDER BY ID_tramite');
    res.json(result.rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

const getById = async (req, res) => {
  try {
    const result = await executeQuery('SELECT * FROM Tramite WHERE ID_tramite = :id', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'No encontrado' });
    res.json(result.rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

const create = async (req, res) => {
  const { ID_tramite, Tipo_tramite, Persona_ID_persona } = req.body;
  try {
    await executeQuery(
      'INSERT INTO Tramite (ID_tramite, Tipo_tramite, Persona_ID_persona) VALUES (:1, :2, :3)',
      [ID_tramite, Tipo_tramite, Persona_ID_persona]
    );
    res.status(201).json({ mensaje: 'Trámite creado exitosamente' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

const update = async (req, res) => {
  const { Tipo_tramite, Persona_ID_persona } = req.body;
  try {
    const result = await executeQuery(
      'UPDATE Tramite SET Tipo_tramite = :1, Persona_ID_persona = :2 WHERE ID_tramite = :3',
      [Tipo_tramite, Persona_ID_persona, req.params.id]
    );
    if (result.rowsAffected === 0) return res.status(404).json({ error: 'No encontrado' });
    res.json({ mensaje: 'Trámite actualizado exitosamente' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

const remove = async (req, res) => {
  try {
    const result = await executeQuery('DELETE FROM Tramite WHERE ID_tramite = :id', [req.params.id]);
    if (result.rowsAffected === 0) return res.status(404).json({ error: 'No encontrado' });
    res.json({ mensaje: 'Trámite eliminado exitosamente' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

module.exports = { getAll, getById, create, update, remove };
