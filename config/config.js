module.exports = {
  server_port: 3000,
  db_url: "",
  db_schemas: [
    {
      file: "./user_schema",
      collection: "users6",
      schemaName: "UserSchema",
      modelName: "UserModel",
    },
  ],
  route_info: [],
  facebook: {
    clientID: "276647026714185",
    clientSecret: "1a33ede06664c47cfbd5aa407226dbfe",
    callbackURL: "/auth/facebook/callback",
  },
};
