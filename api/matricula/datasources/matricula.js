const { SQLDataSource } = require("datasource-sql");
const DataLoader = require("dataloader");

class MatriculaAPI extends SQLDataSource {
  constructor(dbConfig) {
    super(dbConfig);
    this.Resposta = {
      mensagem: "",
    };
  }

  async matricularEstudante(ids) {
    const matricula = {
      estudante_id: ids.estudante,
      turma_id: ids.turma,
      status: "confirmado",
    };
    await this.db.insert(matricula).into("matriculas");
    this.Resposta.mensagem = "Matrícula confirmada";
    return this.Resposta;
  }

  async getMatriculasPorTurma(idTurma) {
    return await this.db
      .select("*")
      .from("matriculas")
      .where({ turma_id: idTurma });
  }

  matriculasLoader = new DataLoader(this.getMatriculasPorEstudante.bind(this));

  async getMatriculasPorEstudante(idsEstudantes) {
    const matriculas = await this.db
      .select("*")
      .from("matriculas")
      .whereIn("estudante_id", idsEstudantes)
      .select();
    return idsEstudantes.map((id) =>
      matriculas.filter((matricula) => matricula.estudante_id == id)
    );
  }
}

module.exports = MatriculaAPI;
