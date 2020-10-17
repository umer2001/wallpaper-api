import fs from "fs";

exports.handler = function (event, context, callback) {
  try {
    console.log("got it....");
    fs.readdir("/complete", (err, files) => {
      if (err) {
        console.log("somthing went wrong -> " + err);
        callback(null, {
          statusCode: 200,
          body: "ohh no",
        });
      } else {
        console.log(files);
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(files),
        });
      }
    });
  } catch (e) {
    console.log(e);
  }
};
