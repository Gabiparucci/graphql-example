const { GraphQLScalarType } = require("graphql");

const userResolvers = {
  RolesType: {
    ESTUDANTE: "ESTUDANTE",
    DOCENTE: "DOCENTE",
    COORDENACAO: "COORDENACAO",
  },
  DateTime: new GraphQLScalarType({
    name: "DateTime",
    description: "Data ISO-8601",
    serialize: (value) => value.toISOString(),
    parseValue: (value) => new Date(value), //variável
    parseLiteral: (ast) => new Date(ast.value), //string "fixa"
  }),
  Query: {
    //root é o nível anterior
    //args são argumentos para o método
    //context  ambiente
    //info traz tudo que o resolver  precisa para resolver
    users: (root, args, { dataSources }, info) =>
      dataSources.usersAPI.getUsers(args),
    user: (root, { id }, { dataSources }) =>
      dataSources.usersAPI.getUserById(id),
  },
  Mutation: {
    addUser: async (root, { user }, { dataSources }) =>
      dataSources.usersAPI.addUser(user),
    atualizaUser: async (root, user, { dataSources }) =>
      dataSources.usersAPI.atualizaUser(user),
    deletaUser: async (root, { id }, { dataSources }) =>
      dataSources.usersAPI.deletaUser(id),
  },

  User: {
    matriculas: (parent, _, { dataSources }) =>
      dataSources.matriculasAPI.matriculasLoader.load(parent.id),
  },
};

module.exports = userResolvers;
