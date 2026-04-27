const { executeQuery } = require('../config/db');

// ============================================================
// CONSULTA 1: Estadísticas de evaluaciones por centro y escuela
// Muestra: Total exámenes, Promedio teórico, Promedio práctico, Aprobados
// ============================================================
const estadisticasCentro = async (req, res) => {
  try {
    const result = await executeQuery(
      `SELECT
         c.Nombre                                        AS Centro,
         e.Nombre                                        AS Escuela,
         COUNT(ev.ID_Evalua)                             AS Total_Examenes,
         ROUND(AVG(
           (SELECT COUNT(*) FROM Resp_Usuario ru
            WHERE ru.Evaluacion_ID_Evalua = ev.ID_Evalua
            AND ru.Es_Correcta = 'S') * 25
         ), 2)                                           AS Promedio_Teorico,
         ROUND(AVG(
           (SELECT NVL(SUM(rpu.Nota_Obtenida), 0)
            FROM Resp_Prac_Usuario rpu
            WHERE rpu.Evaluacion_ID_Evalua = ev.ID_Evalua)
         ), 2)                                           AS Promedio_Practico,
         COUNT(CASE WHEN ev.Fase1 = 'APROBADO' AND ev.Fase2 = 'APROBADO' THEN 1 END) AS Aprobados
       FROM Evaluacion ev
       JOIN Centro_Eva c ON c.ID_Centro  = ev.Centro_Eva_ID_Centro
       JOIN Esc_Auto   e ON e.ID_auto    = ev.Esc_Auto_ID_auto
       GROUP BY c.Nombre, e.Nombre
       ORDER BY c.Nombre, e.Nombre`
    );
    res.json(result.rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

// ============================================================
// CONSULTA 2: Ranking de evaluados por resultado final
// Ordenados por puntaje total (teórico + práctico) descendente
// ============================================================
const rankingEvaluados = async (req, res) => {
  try {
    const result = await executeQuery(
      `SELECT
         RANK() OVER (ORDER BY (punteo_teo + punteo_prac) DESC) AS Ranking,
         p.Nombre_Comp                                            AS Evaluado,
         TO_CHAR(ev.Fech_Eva, 'YYYY-MM-DD')                     AS Fecha_Examen,
         ev.Fase1                                                 AS Resultado_Teorico,
         ev.Fase2                                                 AS Resultado_Practico,
         punteo_teo                                               AS Punteo_Teorico,
         punteo_prac                                              AS Punteo_Practico,
         (punteo_teo + punteo_prac)                              AS Punteo_Total,
         CASE
           WHEN ev.Fase1 = 'APROBADO' AND ev.Fase2 = 'APROBADO' THEN 'APROBADO'
           ELSE 'REPROBADO'
         END                                                      AS Resultado_Final
       FROM Evaluacion ev
       JOIN Persona p ON p.ID_persona = ev.Persona_ID_persona
       JOIN (
         SELECT Evaluacion_ID_Evalua,
                COUNT(CASE WHEN Es_Correcta = 'S' THEN 1 END) * 25 AS punteo_teo
         FROM Resp_Usuario
         GROUP BY Evaluacion_ID_Evalua
       ) teo ON teo.Evaluacion_ID_Evalua = ev.ID_Evalua
       JOIN (
         SELECT Evaluacion_ID_Evalua,
                NVL(SUM(Nota_Obtenida), 0) AS punteo_prac
         FROM Resp_Prac_Usuario
         GROUP BY Evaluacion_ID_Evalua
       ) prac ON prac.Evaluacion_ID_Evalua = ev.ID_Evalua
       ORDER BY Ranking`
    );
    res.json(result.rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

// ============================================================
// CONSULTA 3: Pregunta con menor porcentaje de aciertos
// ============================================================
const preguntaMenorAciertos = async (req, res) => {
  try {
    const result = await executeQuery(
      `SELECT
         et.ID_Teorica                                              AS ID_Pregunta,
         et.Texto_Preg                                             AS Pregunta,
         et.Resp_Correcta                                          AS Respuesta_Correcta,
         COUNT(ru.ID_Resp_Usuario)                                 AS Total_Respuestas,
         COUNT(CASE WHEN ru.Es_Correcta = 'S' THEN 1 END)         AS Total_Aciertos,
         COUNT(CASE WHEN ru.Es_Correcta = 'N' THEN 1 END)         AS Total_Errores,
         ROUND(
           COUNT(CASE WHEN ru.Es_Correcta = 'S' THEN 1 END) * 100.0
           / NULLIF(COUNT(ru.ID_Resp_Usuario), 0), 2
         )                                                         AS Porcentaje_Aciertos
       FROM Eva_Teo et
       LEFT JOIN Resp_Usuario ru ON ru.Eva_Teo_ID_Teorica = et.ID_Teorica
       GROUP BY et.ID_Teorica, et.Texto_Preg, et.Resp_Correcta
       ORDER BY Porcentaje_Aciertos ASC NULLS LAST
       FETCH FIRST 1 ROWS ONLY`
    );
    res.json(result.rows[0] || { mensaje: 'Sin datos suficientes' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

module.exports = { estadisticasCentro, rankingEvaluados, preguntaMenorAciertos };
