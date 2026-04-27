const { executeQuery } = require('../config/db');

const getAll = async (req, res) => {
  try {
    const result = await executeQuery('SELECT * FROM Resp_Teo ORDER BY ID_Respuesta');
    res.json(result.rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

const getById = async (req, res) => {
  try {
    const result = await executeQuery('SELECT * FROM Resp_Teo WHERE ID_Respuesta = :id', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'No encontrado' });
    res.json(result.rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

const create = async (req, res) => {
  const { ID_Respuesta, Texto_Respuesta, Valor_Puntos, Eva_Teo_ID_Teorica } = req.body;
  try {
    await executeQuery(
      'INSERT INTO Resp_Teo (ID_Respuesta, Texto_Respuesta, Valor_Puntos, Eva_Teo_ID_Teorica) VALUES (:1, :2, :3, :4)',
      [ID_Respuesta, Texto_Respuesta, Valor_Puntos, Eva_Teo_ID_Teorica]
    );
    res.status(201).json({ mensaje: 'Respuesta teórica creada exitosamente' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

const update = async (req, res) => {
  const { Texto_Respuesta, Valor_Puntos, Eva_Teo_ID_Teorica } = req.body;
  try {
    const result = await executeQuery(
      'UPDATE Resp_Teo SET Texto_Respuesta = :1, Valor_Puntos = :2, Eva_Teo_ID_Teorica = :3 WHERE ID_Respuesta = :4',
      [Texto_Respuesta, Valor_Puntos, Eva_Teo_ID_Teorica, req.params.id]
    );
    if (result.rowsAffected === 0) return res.status(404).json({ error: 'No encontrado' });
    res.json({ mensaje: 'Respuesta teórica actualizada exitosamente' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

const remove = async (req, res) => {
  try {
    const result = await executeQuery('DELETE FROM Resp_Teo WHERE ID_Respuesta = :id', [req.params.id]);
    if (result.rowsAffected === 0) return res.status(404).json({ error: 'No encontrado' });
    res.json({ mensaje: 'Respuesta teórica eliminada exitosamente' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

module.exports = { getAll, getById, create, update, remove };
