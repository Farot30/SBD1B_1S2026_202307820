const { executeQuery } = require('../config/db');

const getAll = async (req, res) => {
  try {
    const result = await executeQuery('SELECT * FROM Eva_Teo ORDER BY ID_Teorica');
    res.json(result.rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

const getById = async (req, res) => {
  try {
    const result = await executeQuery('SELECT * FROM Eva_Teo WHERE ID_Teorica = :id', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'No encontrado' });
    res.json(result.rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

const create = async (req, res) => {
  const { ID_Teorica, Texto_Preg, Num_Preg, Num_resp, Opcion_A, Opcion_B, Opcion_C, Opcion_D, Resp_Correcta } = req.body;
  try {
    await executeQuery(
      `INSERT INTO Eva_Teo (ID_Teorica, Texto_Preg, Num_Preg, Num_resp, Opcion_A, Opcion_B, Opcion_C, Opcion_D, Resp_Correcta)
       VALUES (:1, :2, :3, :4, :5, :6, :7, :8, :9)`,
      [ID_Teorica, Texto_Preg, Num_Preg, Num_resp, Opcion_A, Opcion_B, Opcion_C, Opcion_D, Resp_Correcta]
    );
    res.status(201).json({ mensaje: 'Pregunta teórica creada exitosamente' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

const update = async (req, res) => {
  const { Texto_Preg, Num_Preg, Num_resp, Opcion_A, Opcion_B, Opcion_C, Opcion_D, Resp_Correcta } = req.body;
  try {
    const result = await executeQuery(
      `UPDATE Eva_Teo SET Texto_Preg = :1, Num_Preg = :2, Num_resp = :3,
        Opcion_A = :4, Opcion_B = :5, Opcion_C = :6, Opcion_D = :7, Resp_Correcta = :8
       WHERE ID_Teorica = :9`,
      [Texto_Preg, Num_Preg, Num_resp, Opcion_A, Opcion_B, Opcion_C, Opcion_D, Resp_Correcta, req.params.id]
    );
    if (result.rowsAffected === 0) return res.status(404).json({ error: 'No encontrado' });
    res.json({ mensaje: 'Pregunta teórica actualizada exitosamente' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

const remove = async (req, res) => {
  try {
    const result = await executeQuery('DELETE FROM Eva_Teo WHERE ID_Teorica = :id', [req.params.id]);
    if (result.rowsAffected === 0) return res.status(404).json({ error: 'No encontrado' });
    res.json({ mensaje: 'Pregunta teórica eliminada exitosamente' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

module.exports = { getAll, getById, create, update, remove };
