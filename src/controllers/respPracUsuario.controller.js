const { executeQuery } = require('../config/db');

const getAll = async (req, res) => {
  try {
    const result = await executeQuery('SELECT * FROM Resp_Prac_Usuario ORDER BY ID_Resp_Prac');
    res.json(result.rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

const getById = async (req, res) => {
  try {
    const result = await executeQuery('SELECT * FROM Resp_Prac_Usuario WHERE ID_Resp_Prac = :id', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'No encontrado' });
    res.json(result.rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

const create = async (req, res) => {
  const { ID_Resp_Prac, Nota_Obtenida, Evaluacion_ID_Evalua, Eva_Prac_ID_Practico } = req.body;
  try {
    await executeQuery(
      `INSERT INTO Resp_Prac_Usuario (ID_Resp_Prac, Nota_Obtenida, Evaluacion_ID_Evalua, Eva_Prac_ID_Practico)
       VALUES (:1, :2, :3, :4)`,
      [ID_Resp_Prac, Nota_Obtenida, Evaluacion_ID_Evalua, Eva_Prac_ID_Practico]
    );
    res.status(201).json({ mensaje: 'Nota práctica creada exitosamente' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

const update = async (req, res) => {
  const { Nota_Obtenida, Evaluacion_ID_Evalua, Eva_Prac_ID_Practico } = req.body;
  try {
    const result = await executeQuery(
      `UPDATE Resp_Prac_Usuario SET Nota_Obtenida = :1, Evaluacion_ID_Evalua = :2, Eva_Prac_ID_Practico = :3
       WHERE ID_Resp_Prac = :4`,
      [Nota_Obtenida, Evaluacion_ID_Evalua, Eva_Prac_ID_Practico, req.params.id]
    );
    if (result.rowsAffected === 0) return res.status(404).json({ error: 'No encontrado' });
    res.json({ mensaje: 'Nota práctica actualizada exitosamente' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

const remove = async (req, res) => {
  try {
    const result = await executeQuery('DELETE FROM Resp_Prac_Usuario WHERE ID_Resp_Prac = :id', [req.params.id]);
    if (result.rowsAffected === 0) return res.status(404).json({ error: 'No encontrado' });
    res.json({ mensaje: 'Nota práctica eliminada exitosamente' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

module.exports = { getAll, getById, create, update, remove };
