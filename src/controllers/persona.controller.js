const { executeQuery } = require('../config/db');

const getAll = async (req, res) => {
  try {
    const result = await executeQuery(
      `SELECT ID_persona, Nombre_Comp, Direccion, IDE, Telefono, Genero,
              TO_CHAR(Fecha_Naci,'YYYY-MM-DD') AS Fecha_Naci,
              Tramite_ID_tramite, Personal_ID_personal, Licencia_ID_Licencia,
              Registracion_ID_registro, Municipio_ID_Municipio
       FROM Persona ORDER BY ID_persona`
    );
    res.json(result.rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

const getById = async (req, res) => {
  try {
    const result = await executeQuery(
      `SELECT ID_persona, Nombre_Comp, Direccion, IDE, Telefono, Genero,
              TO_CHAR(Fecha_Naci,'YYYY-MM-DD') AS Fecha_Naci,
              Tramite_ID_tramite, Personal_ID_personal, Licencia_ID_Licencia,
              Registracion_ID_registro, Municipio_ID_Municipio
       FROM Persona WHERE ID_persona = :id`,
      [req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'No encontrado' });
    res.json(result.rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

const create = async (req, res) => {
  const {
    ID_persona, Nombre_Comp, Direccion, IDE, Telefono, Genero, Fecha_Naci,
    Tramite_ID_tramite, Personal_ID_personal, Licencia_ID_Licencia,
    Registracion_ID_registro, Municipio_ID_Municipio
  } = req.body;
  try {
    await executeQuery(
      `INSERT INTO Persona (ID_persona, Nombre_Comp, Direccion, IDE, Telefono, Genero, Fecha_Naci,
        Tramite_ID_tramite, Personal_ID_personal, Licencia_ID_Licencia,
        Registracion_ID_registro, Municipio_ID_Municipio)
       VALUES (:1, :2, :3, :4, :5, :6, TO_DATE(:7,'YYYY-MM-DD'), :8, :9, :10, :11, :12)`,
      [ID_persona, Nombre_Comp, Direccion, IDE, Telefono, Genero, Fecha_Naci,
       Tramite_ID_tramite, Personal_ID_personal, Licencia_ID_Licencia,
       Registracion_ID_registro, Municipio_ID_Municipio]
    );
    res.status(201).json({ mensaje: 'Persona creada exitosamente' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

const update = async (req, res) => {
  const { Nombre_Comp, Direccion, IDE, Telefono, Genero, Fecha_Naci,
          Tramite_ID_tramite, Personal_ID_personal, Licencia_ID_Licencia,
          Registracion_ID_registro, Municipio_ID_Municipio } = req.body;
  try {
    const result = await executeQuery(
      `UPDATE Persona SET Nombre_Comp = :1, Direccion = :2, IDE = :3, Telefono = :4,
        Genero = :5, Fecha_Naci = TO_DATE(:6,'YYYY-MM-DD'), Tramite_ID_tramite = :7,
        Personal_ID_personal = :8, Licencia_ID_Licencia = :9,
        Registracion_ID_registro = :10, Municipio_ID_Municipio = :11
       WHERE ID_persona = :12`,
      [Nombre_Comp, Direccion, IDE, Telefono, Genero, Fecha_Naci,
       Tramite_ID_tramite, Personal_ID_personal, Licencia_ID_Licencia,
       Registracion_ID_registro, Municipio_ID_Municipio, req.params.id]
    );
    if (result.rowsAffected === 0) return res.status(404).json({ error: 'No encontrado' });
    res.json({ mensaje: 'Persona actualizada exitosamente' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

const remove = async (req, res) => {
  try {
    const result = await executeQuery('DELETE FROM Persona WHERE ID_persona = :id', [req.params.id]);
    if (result.rowsAffected === 0) return res.status(404).json({ error: 'No encontrado' });
    res.json({ mensaje: 'Persona eliminada exitosamente' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

module.exports = { getAll, getById, create, update, remove };
