require("dotenv").config();

module.exports = {
  port: process.env.PORT,
  env: process.env.NODE_ENV,
  mongo: {
    uri: process.env.MONGODB_URI,
    // port: process.env.MONGO_PORT,
    isDebug: process.env.MONGOOSE_DEBUG,
  },
};
