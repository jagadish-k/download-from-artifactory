const core = require('@actions/core');
const fs = require('fs');
const AWS = require('aws-sdk');

// Set the Region
AWS.config.update({
  region: core.getInput('aws-region'),
  accessKeyId: core.getInput('aws-access-key-id'),
  secretAccessKey: core.getInput('aws-secret-access-key'),
});

// most @actions toolkit packages have async methods
async function run() {
  try {
    const s3 = new AWS.S3();
    const fileToDownload = core.getInput('artifact');
    const file = `./${fileToDownload}`;
    const options = {
      Bucket: core.getInput('artifactory-bucket'),
      Key: `${core.getInput('app-path')}/builds/${fileToDownload}`,
    };

    // Check if object exists
    const { ContentLength } = await s3.headObject(options).promise();
    if (ContentLength) {
      const writer = fs.createWriteStream(file, {
        flags: 'w',
      });
      const fileStream = s3.getObject(options).createReadStream();

      fileStream.pipe(writer);
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
