const mongoose = require("mongoose");

class Mongo {
//   gridfs = null;
  static connect = () => {
    mongoose
      .connect(process.env.MONGO_URL, () => {
        console.log("connect mongo success");
      })
      .catch((err) => console.error("Can not connect to DB"));
    // const conn = mongoose.connection;
    // conn.once("open", () => {
    //   this.gridfs = new mongoose.mongo.GridFSBucket(conn.db, {
    //     bucketName: process.env.BUCKET_NAME,
    //   });
    // });
  };
}
module.exports = Mongo;
