import fs from "fs";
import util from "util";

const exec = util.promisify(require("child_process").exec);


exports.handler = async function (event, context, callback) {
    const video = event.path.replace("/api/display/", "");
  try {
    console.log("got it....");
    const data = fs.readFileSync(`/complete/${video}`);
    await exec(
        `pwd`,
        function (error, stdout, stderr) {
            callback(null, {
                statusCode: 200,
                body: 
                `<html>
                  <video  controls="" autoplay="" name="media">
                      <source src="${`file:///D:/complete/${video}`}" type="video/mp4">
                  </video>
                  <script>
                  console.log("hello...");
                  </script>
                </html>`,
              });
          console.log("out" + stdout);
          console.log(data);
          console.log(error);
        }
      );
        
  } catch (e) {
    console.log(e);
  }
};
