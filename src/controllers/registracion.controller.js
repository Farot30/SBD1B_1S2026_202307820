const { executeQuery } = require('../config/db');

const getAll = async (req, res) => {
  try {
    const result = await executeQuery('SELECT * FROM Registracion ORDER BY ID_registro');
    res.json(result.rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

const getById = async (req, res) => {
  try {
    const result = await executeQuery('SELECT * FROM Registracion WHERE ID_registro = :id', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'No encontrado' });
    res.json(result.rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

const create = async (req, res) => {
  const { ID_registro, Fecha_reg, Persona_ID_persona, Esc_Auto_ID_auto } = req.body;
  try {
    await executeQuery(
      'INSERT INTO Registracion (ID_registro, Fecha_reg, Persona_ID_persona, Esc_Auto_ID_auto) VALUES (:1, TO_DATE(:2,\'YYYY-MM-DD\'), :3, :4)',
      [ID_registro, Fecha_reg, Persona_ID_persona, Esc_Auto_ID_auto]
    );
    res.status(201).json({ mensaje: 'Registración creada exitosamente' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

const update = async (req, res) => {
  const { Fecha_reg, Persona_ID_persona, Esc_Auto_ID_auto } = req.body;
  try {
    const result = await executeQuery(
      'UPDATE Registracion SET Fecha_reg = TO_DATE(:1,\'YYYY-MM-DD\'), Persona_ID_persona = :2, Esc_Auto_ID_auto = :3 WHERE ID_registro = :4',
      [Fecha_reg, Persona_ID_persona, Esc_Auto_ID_auto, req.params.id]
    );
    if (result.rowsAffected === 0) return res.status(404).json({ error: 'No encontrado' });
    res.json({ mensaje: 'Registración actualizada exitosamente' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

const remove = async (req, res) => {
  try {
    const result = await executeQuery('DELETE FROM Registracion WHERE ID_registro = :id', [req.params.id]);
    if (result.rowsAffected === 0) return res.status(404).json({ error: 'No encontrado' });
    res.json({ mensaje: 'Registración eliminada exitosamente' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

module.exports = { getAll, getById, create, update, remove };
