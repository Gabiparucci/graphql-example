const { GraphQLScalarType } = require("graphql");

const turmaResolvers = {
  DateTime: new GraphQLScalarType({
    name: "DateTime",
    description: "string de data e hora no formato ISO-8601",
    serialize: (value) => new Date(value).toISOString(),
    parseValue: (value) => new Date(value),
    parseLiteral: (ast) => new Date(ast.value).toISOString(),
  }),

  Query: {
    turmas: (_, __, { dataSources }) => dataSources.turmasAPI.getTurmas(),
    turma: (_, { id }, { dataSources }) =>
      dataSources.turmasAPI.getTurmaById(id),
  },

  Mutation: {
    incluiTurma: (_, { turma }, { dataSources }) =>
      dataSources.turmasAPI.incluiTurma(turma),
  },

  Turma: {
    matriculas: (parent, _, { dataSources }) =>
      dataSources.matriculasAPI.getMatriculasPorTurma(parent.id),
    docente: (parent, _, { dataSources }) =>
      dataSources.usersAPI.getUserById(parent.docente_id),
  },
};

module.exports = turmaResolvers;
