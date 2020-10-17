import path from "path";
import util from "util";
import { filterImageFromURL, renderVideo, deleteLocalFiles } from "./util/util";

const exec = util.promisify(require("child_process").exec);

exports.handler = async function (event, context, callback) {
  const url = event.path.replace("/api/makeWallpaper/", "");
  const videoEncoder = "h264"; // mpeg4 libvpx
  if (!url) {
    callback(null, {
      statusCode: 200,
      body: "add /imageurl & try again ....",
    });
  }
  callback(null, {
    statusCode: 200,
    body: "drum",
  });
  try {
    console.log("got it....");
    const output = path.basename(url, ".jpg");
    const promises = [];
    for (var i = 0; i <= 5; i++) {
      promises.push(filterImageFromURL(url, i));
    }
    Promise.all(promises)
      .then(async (results) => {
        callback(null, {
          statusCode: 200,
          body: "done ....",
        });
        console.log("All done", results);
        await renderVideo(output);
        deleteLocalFiles(results);
      })
      .catch((e) => {
        // Handle errors here
      });
  } catch (e) {
    console.log(e);
  }
};
