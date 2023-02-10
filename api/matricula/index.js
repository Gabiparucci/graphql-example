const matriculaSchema = require("./schema/matricula.graphql");
const matriculaResolvers = require("./resolvers/matriculaResolvers");
const MatriculaAPI = require("./datasources/matricula");

module.exports = {
  matriculaSchema,
  matriculaResolvers,
  MatriculaAPI,
};
