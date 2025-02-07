const express = require('express');
const AWS = require('aws-sdk');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const app = express();
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION
});

// Upload to S3
app.post('/api/upload', upload.single('file'), (req, res) => {
  const params = {
    Bucket: process.env.S3_BUCKET,
    Key: req.file.originalname,
    Body: require('fs').createReadStream(req.file.path)
  };

  s3.upload(params, (err, data) => {
    if (err) res.status(500).send(err);
    else res.status(200).send(data.Location);
  });
});

app.listen(5000, () => console.log('Server running on port 5000'));
