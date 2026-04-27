const { executeQuery } = require('../config/db');

const getAll = async (req, res) => {
  try {
    const result = await executeQuery('SELECT * FROM Eva_Prac ORDER BY ID_Practico');
    res.json(result.rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

const getById = async (req, res) => {
  try {
    const result = await executeQuery('SELECT * FROM Eva_Prac WHERE ID_Practico = :id', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'No encontrado' });
    res.json(result.rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

const create = async (req, res) => {
  const { ID_Practico, Descripcion, Num_Pregun, Punteo_Max } = req.body;
  try {
    await executeQuery(
      'INSERT INTO Eva_Prac (ID_Practico, Descripcion, Num_Pregun, Punteo_Max) VALUES (:1, :2, :3, :4)',
      [ID_Practico, Descripcion, Num_Pregun, Punteo_Max]
    );
    res.status(201).json({ mensaje: 'Ejercicio práctico creado exitosamente' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

const update = async (req, res) => {
  const { Descripcion, Num_Pregun, Punteo_Max } = req.body;
  try {
    const result = await executeQuery(
      'UPDATE Eva_Prac SET Descripcion = :1, Num_Pregun = :2, Punteo_Max = :3 WHERE ID_Practico = :4',
      [Descripcion, Num_Pregun, Punteo_Max, req.params.id]
    );
    if (result.rowsAffected === 0) return res.status(404).json({ error: 'No encontrado' });
    res.json({ mensaje: 'Ejercicio práctico actualizado exitosamente' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

const remove = async (req, res) => {
  try {
    const result = await executeQuery('DELETE FROM Eva_Prac WHERE ID_Practico = :id', [req.params.id]);
    if (result.rowsAffected === 0) return res.status(404).json({ error: 'No encontrado' });
    res.json({ mensaje: 'Ejercicio práctico eliminado exitosamente' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

module.exports = { getAll, getById, create, update, remove };
