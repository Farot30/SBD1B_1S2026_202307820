const oracledb = require('oracledb');

const dbConfig = {
  user:             process.env.DB_USER     || 'centros_db',
  password:         process.env.DB_PASSWORD || 'Admin1234',
  connectString:    `${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || 1521}/${process.env.DB_SERVICE || 'XEPDB1'}`
};

// Devolver resultados como objetos en vez de arrays
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

// Configurar encoding UTF-8
process.env.NLS_LANG = 'AMERICAN_AMERICA.AL32UTF8';

async function getConnection() {
  return await oracledb.getConnection(dbConfig);
}

async function executeQuery(sql, params = []) {
  let conn;
  try {
    conn = await getConnection();
    const result = await conn.execute(sql, params, { autoCommit: true });
    return result;
  } finally {
    if (conn) await conn.close();
  }
}

module.exports = { getConnection, executeQuery };