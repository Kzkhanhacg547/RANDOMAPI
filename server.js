const router = require("express").Router();
const { readdirSync, readFileSync } = require('fs-extra');
const path = require('path');
const axios = require('axios');

try {
  // ------------------------------------------------------------------------//
  // ------------------------/     Fodel public    /-------------------------//
  // ------------------------------------------------------------------------//
  let n = 0;
  const srcPathPublic = path.join(__dirname, "/public/");
  const hostingPublic = readdirSync(srcPathPublic).filter((file) => file.endsWith(".js"));
  for (const i of hostingPublic) {
    const { index, name } = require(path.join(srcPathPublic, i));
    router.get(name, index);
    n++
    console.log(i);
  }

  // ------------------------------------------------------------------------//
  // ------------------------/     Kz-API folder    /------------------------//
  // ------------------------------------------------------------------------//
  const srcPathKzAPI = path.join(__dirname, "/Kz-API/");
  const hostingKzAPI = readdirSync(srcPathKzAPI).filter((file) => file.endsWith(".js"));
  for (const i of hostingKzAPI) {
    const { index, name } = require(path.join(srcPathKzAPI, i));
    router.get(name, index);
    n++
    console.log(i);
  }

  // for 'post' folder
  const srcPathPost = path.join(__dirname, "/post/");
  const hostingPost = readdirSync(srcPathPost).filter((file) => file.endsWith(".js"));
  for (const j of hostingPost) {
    const { index, name } = require(path.join(srcPathPost, j));
    router.post(name, index);
    n++
    console.log('post/' + j);
  }

  // additional routes
  router.get('/altp_data', function (req, res) {
    const data = JSON.parse(readFileSync('./altp_data.json', "utf-8"));
    res.header("Content-Type", 'application/json');
    res.send(JSON.stringify(data, null, 4));
  });

  // ------------------------------------------------------------------------//
  // ----------------------------/     Fodel    /----------------------------//
  // ------------------------------------------------------------------------//
  const getDirs = readdirSync(srcPathPublic).filter((file) => !file.endsWith(".js") && !file.endsWith(".json"));
  for (const dir of getDirs) {
    const fileName = readdirSync(path.join(srcPathPublic, dir)).filter((file) => file.endsWith(".js"));
    for (const j of fileName) {
      const { index, name } = require(path.join(srcPathPublic, dir, j));
      router.get(name, index);
      n++
      // console.log('\x1b[38;5;220m[ LOADING ] \x1b[33m→\x1b[40m\x1b[1m\x1b[38;5;161m Đã tải thành công ' + j);
    }
  }

  // for 'post' folder
  const getDirsPost = readdirSync(srcPathPost).filter((file) => !file.endsWith(".js") && !file.endsWith(".json"));
  for (const dir of getDirsPost) {
    const fileName = readdirSync(path.join(srcPathPost, dir)).filter((file) => file.endsWith(".js"));
    for (const j of fileName) {
      const { index, name } = require(path.join(srcPathPost, dir, j));
      router.post(name, index);
      n++
      // console.log('\x1b[38;5;220m[ LOADING ] \x1b[33m→\x1b[38;5;197m Đã tải thành công POST/' + j);
    }
  }
  console.log(`\x1b[38;5;220m[ LOADING ] \x1b[33m→\x1b[38;5;197m Đã load thành công ${n} file API`);
} catch (e) {
  console.log(e);
}

// -------------------------->      END     <------------------------------//
module.exports = router;

const apiEndpoints = [
  'https://facebook.com/kzkhanh547',
  'https://4dd9ea6e-d5a6-4f8f-892c-ce90e4d539b9-00-11lae77drh9zo.janeway.replit.dev/',
  'https://87fe0029-a5c4-45a3-bc8e-2782d1b6c6f7-00-uabqti4gbjvq.pike.replit.dev/blog'
];

async function callAPI(url) {
  try {
    await axios.get(url);
    console.log(`Successfully accessed API at: ${url} \n`);
  } catch (error) {
    console.error(`Error accessing API at ${url}:`, error.message);
  }
}

function performAPICalls() {
  apiEndpoints.forEach(url => callAPI(url));
}

// Lặp lại cuộc gọi API mỗi 5 giây (5000 milliseconds)
setInterval(performAPICalls, 5000);
