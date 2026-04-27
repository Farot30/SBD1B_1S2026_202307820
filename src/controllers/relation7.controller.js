const { executeQuery } = require('../config/db');

const getAll = async (req, res) => {
  try {
    const result = await executeQuery(
      `SELECT r.Esc_Auto_ID_auto, e.Nombre AS Escuela,
              r.Centro_Eva_ID_Centro, c.Nombre AS Centro
       FROM Relation_7 r
       JOIN Esc_Auto e  ON e.ID_auto    = r.Esc_Auto_ID_auto
       JOIN Centro_Eva c ON c.ID_Centro = r.Centro_Eva_ID_Centro
       ORDER BY r.Esc_Auto_ID_auto`
    );
    res.json(result.rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

const create = async (req, res) => {
  const { Esc_Auto_ID_auto, Centro_Eva_ID_Centro } = req.body;
  try {
    await executeQuery(
      'INSERT INTO Relation_7 (Esc_Auto_ID_auto, Centro_Eva_ID_Centro) VALUES (:1, :2)',
      [Esc_Auto_ID_auto, Centro_Eva_ID_Centro]
    );
    res.status(201).json({ mensaje: 'Ubicación creada exitosamente' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

const remove = async (req, res) => {
  const { escuela, centro } = req.params;
  try {
    const result = await executeQuery(
      'DELETE FROM Relation_7 WHERE Esc_Auto_ID_auto = :1 AND Centro_Eva_ID_Centro = :2',
      [escuela, centro]
    );
    if (result.rowsAffected === 0) return res.status(404).json({ error: 'No encontrado' });
    res.json({ mensaje: 'Ubicación eliminada exitosamente' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

module.exports = { getAll, create, remove };
