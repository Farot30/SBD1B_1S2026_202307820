const { executeQuery } = require('../config/db');

const getAll = async (req, res) => {
  try {
    const result = await executeQuery('SELECT * FROM Resp_Usuario ORDER BY ID_Resp_Usuario');
    res.json(result.rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

const getById = async (req, res) => {
  try {
    const result = await executeQuery('SELECT * FROM Resp_Usuario WHERE ID_Resp_Usuario = :id', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'No encontrado' });
    res.json(result.rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

const create = async (req, res) => {
  const { ID_Resp_Usuario, Respuesta, Es_Correcta, Evaluacion_ID_Evalua, Eva_Teo_ID_Teorica } = req.body;
  try {
    await executeQuery(
      `INSERT INTO Resp_Usuario (ID_Resp_Usuario, Respuesta, Es_Correcta, Evaluacion_ID_Evalua, Eva_Teo_ID_Teorica)
       VALUES (:1, :2, :3, :4, :5)`,
      [ID_Resp_Usuario, Respuesta, Es_Correcta || null, Evaluacion_ID_Evalua, Eva_Teo_ID_Teorica]
    );
    res.status(201).json({ mensaje: 'Respuesta de usuario creada exitosamente' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

const update = async (req, res) => {
  const { Respuesta, Es_Correcta, Evaluacion_ID_Evalua, Eva_Teo_ID_Teorica } = req.body;
  try {
    const result = await executeQuery(
      `UPDATE Resp_Usuario SET Respuesta = :1, Es_Correcta = :2,
        Evaluacion_ID_Evalua = :3, Eva_Teo_ID_Teorica = :4
       WHERE ID_Resp_Usuario = :5`,
      [Respuesta, Es_Correcta || null, Evaluacion_ID_Evalua, Eva_Teo_ID_Teorica, req.params.id]
    );
    if (result.rowsAffected === 0) return res.status(404).json({ error: 'No encontrado' });
    res.json({ mensaje: 'Respuesta de usuario actualizada exitosamente' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

const remove = async (req, res) => {
  try {
    const result = await executeQuery('DELETE FROM Resp_Usuario WHERE ID_Resp_Usuario = :id', [req.params.id]);
    if (result.rowsAffected === 0) return res.status(404).json({ error: 'No encontrado' });
    res.json({ mensaje: 'Respuesta de usuario eliminada exitosamente' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

module.exports = { getAll, getById, create, update, remove };
