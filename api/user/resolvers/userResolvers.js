const userResolvers = {
  Query: {
    //root é o nível anterior
    //args são argumentos para o método
    //context  ambiente
    //info traz tudo que o resolver  precisa para resolver
    users: (root, args, { dataSources }, info) =>
      dataSources.usersAPI.getUsers(),
    user: (root, { id }, { dataSources }) =>
      dataSources.usersAPI.getUserById(id),
  },
};

module.exports = userResolvers;
