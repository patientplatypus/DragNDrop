var express = require('express');
var router = express.Router();
var axios = require('axios');
const fs = require('fs');
const shell = require('shelljs');
// const { exec } = require('child_process');
const { spawn, exec } = require('child_process');
const child_process = require('child_process');


// var fdk=require('@fnproject/fdk');
//
// fdk.handle(function(input){
//   var name = 'World';
//   if (input.name) {
//     name = input.name;
//   }
//   response = {'message': 'Hello ' + name}
//   return response
// })

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/dockerClean', function(req, res, next){
  console.log('inside dockerClean');
  shell.exec('echo Fvnjty0b | sudo -S command');
  shell.exec('chmod 777 ./spinCompute/dockerClean.sh');
  shell.exec('./spinCompute/dockerClean.sh')
  res.json({ status: 'success' });
})

router.post('/spinFn', function(req,res,next){
  console.log('inside spinFn');
  console.log('req.body.code: ', req.body.code);
  exec('echo Fvnjty0b | sudo -S command');
  exec('chmod 777 ./spinFn/start.sh');
  exec('chmod 777 ./spinFn/message.txt');

  // spawn('./spinFn/start.sh').on('exit', function (code, signal) {
  //   console.log('can now run function, spun up');
  // });
  console.log(__dirname);
  // fs.writeFile(__dirname + '/spinFn/message.txt', 'Hello Node.js', (err) => {
  //   if (err) throw err;
  //   console.log('The file has been saved!');
  //   const child = child_process.spawn('bash', [ __dirname + '/spinFn/start.sh']);
  //   // const child = child_process.spawn('./spinFn/start.sh');
  //   child.on('exit', () => {
  //       console.log('process exit');
  //   });
  //   child.stdout.pipe(process.stdout)
  //   child.stderr.pipe(process.stderr)
  // });

  // const child = child_process.spawn('bash', [ __dirname + '/spinFn/start.sh']);
  // const child = child_process.spawn('bash', [ __dirname + '/spinFn/func.js']);
  // // const child = child_process.spawn('./spinFn/start.sh');
  // child.on('exit', () => {
  //     console.log('process exit');
  // });
  // child.stdout.pipe(process.stdout)
  // child.stderr.pipe(process.stderr)


  var returnVal;
  axios.post('http://localhost:8080/r/demoapp/hello', req.body.code)
  .then(response=>{
    console.log('response from Fn Server: ', response.data);
    returnVal = response.data
    res.json({ "output": returnVal})
  })
  .catch(err=>{
    console.log('err: ', err);
    res.json({ "err": err})
  })

  // res.json({"return": "success"})

})

// router.get('/startFn', function(req, res, next){
//   console.log('inside startFn');
//   shell.exec('echo Fvnjty0b | sudo -S command');
//   shell.exec('chmod 777 ./spinCompute/startFn.sh');
//   // shell.exec('nohup ./spinCompute/startFn.sh &')
//   spawn('./spinCompute/startFn.sh');
//   res.json({ status: 'success' });
//   // exec('./spinCompute/startFn.sh', (err, stdout, stderr) => {
//   //   if (err) {
//   //     console.error(`exec error: ${err}`);
//   //     return;
//   //   }else{
//   //     console.log(`inside exec callback and ok`);
//   //     res.json({ status: 'success' });
//   //   }
//   // });
// })

// router.get('/startSpin', function(req, res, next){
//   console.log('inside startSpin');
//   shell.exec('echo Fvnjty0b | sudo -S command');
//   shell.exec('chmod 777 ./spinCompute/startSpin.sh')
//   shell.exec('./spinCompute/startSpin.sh')
//   res.json({ status: 'success' });
// })



module.exports = router;
