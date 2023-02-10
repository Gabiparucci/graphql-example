const { SQLDataSource } = require("datasource-sql");

class TurmasAPI extends SQLDataSource {
  constructor(dbConfig) {
    super(dbConfig);
  }

  async getTurmas() {
    return await this.db.select("*").from("turmas");
  }

  async getTurmaById(id) {
    const turmas = await this.db
      .select("*")
      .from("turmas")
      .where({ id: Number(id) });
    return turmas[0];
  }

  async incluiTurma(novaTurma) {
    const novaTurmaId = await this.db
      .insert(novaTurma)
      .returning("id")
      .into("turmas");

    const turmaInserida = await this.getTurma(novaTurmaId[0]);
    return { ...turmaInserida };
  }
}

module.exports = TurmasAPI;
