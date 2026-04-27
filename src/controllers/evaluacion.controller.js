const { executeQuery } = require('../config/db');

const getAll = async (req, res) => {
  try {
    const result = await executeQuery(
      `SELECT ID_Evalua, Num_Corre, TO_CHAR(Fech_Eva,'YYYY-MM-DD') AS Fech_Eva,
              Fase1, Fase2, Persona_ID_persona, Instructor_ID_instructor,
              Esc_Auto_ID_auto, Centro_Eva_ID_Centro
       FROM Evaluacion ORDER BY ID_Evalua`
    );
    res.json(result.rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

const getById = async (req, res) => {
  try {
    const result = await executeQuery(
      `SELECT ID_Evalua, Num_Corre, TO_CHAR(Fech_Eva,'YYYY-MM-DD') AS Fech_Eva,
              Fase1, Fase2, Persona_ID_persona, Instructor_ID_instructor,
              Esc_Auto_ID_auto, Centro_Eva_ID_Centro
       FROM Evaluacion WHERE ID_Evalua = :id`,
      [req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'No encontrado' });
    res.json(result.rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

const create = async (req, res) => {
  const { ID_Evalua, Num_Corre, Fech_Eva, Fase1, Fase2,
          Persona_ID_persona, Instructor_ID_instructor,
          Esc_Auto_ID_auto, Centro_Eva_ID_Centro } = req.body;
  try {
    await executeQuery(
      `INSERT INTO Evaluacion (ID_Evalua, Num_Corre, Fech_Eva, Fase1, Fase2,
        Persona_ID_persona, Instructor_ID_instructor, Esc_Auto_ID_auto, Centro_Eva_ID_Centro)
       VALUES (:1, :2, TO_DATE(:3,'YYYY-MM-DD'), :4, :5, :6, :7, :8, :9)`,
      [ID_Evalua, Num_Corre, Fech_Eva, Fase1, Fase2,
       Persona_ID_persona, Instructor_ID_instructor, Esc_Auto_ID_auto, Centro_Eva_ID_Centro]
    );
    res.status(201).json({ mensaje: 'Evaluación creada exitosamente' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

const update = async (req, res) => {
  const { Num_Corre, Fech_Eva, Fase1, Fase2,
          Persona_ID_persona, Instructor_ID_instructor,
          Esc_Auto_ID_auto, Centro_Eva_ID_Centro } = req.body;
  try {
    const result = await executeQuery(
      `UPDATE Evaluacion SET Num_Corre = :1, Fech_Eva = TO_DATE(:2,'YYYY-MM-DD'),
        Fase1 = :3, Fase2 = :4, Persona_ID_persona = :5,
        Instructor_ID_instructor = :6, Esc_Auto_ID_auto = :7, Centro_Eva_ID_Centro = :8
       WHERE ID_Evalua = :9`,
      [Num_Corre, Fech_Eva, Fase1, Fase2,
       Persona_ID_persona, Instructor_ID_instructor,
       Esc_Auto_ID_auto, Centro_Eva_ID_Centro, req.params.id]
    );
    if (result.rowsAffected === 0) return res.status(404).json({ error: 'No encontrado' });
    res.json({ mensaje: 'Evaluación actualizada exitosamente' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

const remove = async (req, res) => {
  try {
    const result = await executeQuery('DELETE FROM Evaluacion WHERE ID_Evalua = :id', [req.params.id]);
    if (result.rowsAffected === 0) return res.status(404).json({ error: 'No encontrado' });
    res.json({ mensaje: 'Evaluación eliminada exitosamente' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

module.exports = { getAll, getById, create, update, remove };
