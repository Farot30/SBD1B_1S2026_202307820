const { executeQuery } = require('../config/db');

const getAll = async (req, res) => {
  try {
    const result = await executeQuery('SELECT * FROM Resp_Prac ORDER BY ID_Practica');
    res.json(result.rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

const getById = async (req, res) => {
  try {
    const result = await executeQuery('SELECT * FROM Resp_Prac WHERE ID_Practica = :id', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'No encontrado' });
    res.json(result.rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

const create = async (req, res) => {
  const { ID_Practica, Valor_Puntos, Proce, Eva_Prac_ID_Practico } = req.body;
  try {
    await executeQuery(
      'INSERT INTO Resp_Prac (ID_Practica, Valor_Puntos, Proce, Eva_Prac_ID_Practico) VALUES (:1, :2, :3, :4)',
      [ID_Practica, Valor_Puntos, Proce, Eva_Prac_ID_Practico]
    );
    res.status(201).json({ mensaje: 'Respuesta práctica creada exitosamente' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

const update = async (req, res) => {
  const { Valor_Puntos, Proce, Eva_Prac_ID_Practico } = req.body;
  try {
    const result = await executeQuery(
      'UPDATE Resp_Prac SET Valor_Puntos = :1, Proce = :2, Eva_Prac_ID_Practico = :3 WHERE ID_Practica = :4',
      [Valor_Puntos, Proce, Eva_Prac_ID_Practico, req.params.id]
    );
    if (result.rowsAffected === 0) return res.status(404).json({ error: 'No encontrado' });
    res.json({ mensaje: 'Respuesta práctica actualizada exitosamente' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

const remove = async (req, res) => {
  try {
    const result = await executeQuery('DELETE FROM Resp_Prac WHERE ID_Practica = :id', [req.params.id]);
    if (result.rowsAffected === 0) return res.status(404).json({ error: 'No encontrado' });
    res.json({ mensaje: 'Respuesta práctica eliminada exitosamente' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

module.exports = { getAll, getById, create, update, remove };
