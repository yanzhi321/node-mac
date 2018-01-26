const express = require('express')

const fs = require('fs')
const path = require('path')
const request = require('request')
const http = require('http')
const favicons = require('connect-favicons');

const app = express()


// http://standards-oui.ieee.org/oui.txt
// const url = 'http://standards-oui.ieee.org/oui.txt'

//icon -- https://github.com/theworkers/connect-favicons
app.use(favicons(__dirname + '/public/icons'));
app.use(express.static(path.join(__dirname, '/public')));


app.get('/', function (req, res) {
  res.send('hello, express')
})

// 设置编码格式  
fs.readFile('./test.txt', 'utf-8', function(err, data) {  
    // 读取文件失败/错误  
    if (err) {  
        throw err;  
    }  
    // 读取文件成功  
    console.log("success")
    //let patt5 = /[A-Z0-9-]{8}|[A-Z0-9]{6}/g
    let patt = /[A-Z0-9]{2}(-)[A-Z0-9]{2}(-)[A-Z0-9]{2}/g
    let patt2 = /[A-Z0-9]{6}/g

    let arr = data.match(patt)
    let arr2 = data.match(patt2)

    let arr3 = []
    arr.map( (con, i) => {
        let item = '' 
        item = con.replace(/[-]/g, '')
        arr3.push(item)
    })
    //console.log(arr3, arr3.length)
   
   //console.log(arr,   arr2)
   //console.log(arr.length, arr3.length)

   //arr4
   let arr4 = []
   for(let i = 0; i<10; i++){
        let obj = {}
        obj.name = arr[i]
        obj.age = arr3[i]
        arr4.push(obj)
   }
  
   //patt4
   let patt4 = /(\(base 16\))(\t+)(.+)(\r)/g
   let myStr2 = data.match(patt4)
   //console.log(myStr2.length, myStr.length)

   //res2
   let res2 = []
   for(let i = 0; i<myStr2.length; i++){
        let str = myStr2[i].replace(/(\(base 16\))(\s+)/g, '')
        res2.push(str)
   }
   //console.log(res2.length, myStr2.length)

   //patt5
   let patt5 = /[A-Z0-9]{2}(-)[A-Z0-9]{2}(-)[A-Z0-9]{2}(\s+)(\(hex\))/g
   let myStr3 = data.match(patt5)
   //console.log(myStr3, 'myStr3')

   let patt6 = /[A-Z0-9]{6}(\s+)(\(base 16\))/g
   let myStr4 = data.match(patt6)
   //console.log(myStr4.length, myStr3.length)

   //res3--res4
   let res3 = [], res4 = [];
   for(let i = 0; i<myStr3.length; i++){
        let str = myStr3[i].replace(/(\s+)\(hex\)/g, '')
        res3.push(str)
   }
   //console.log(res3, res3.length, myStr3.length, 'res3')
   //res4
   for(let i = 0; i<myStr4.length; i++){
        let str = myStr4[i].replace(/(\s+)(\(base 16\))/g, '')
        res4.push(str)
   }
   //console.log(res4, res4.length, res3.length, res2.length)
   let res33 = []
   for(let i = 0; i<res3.length; i++){
        let str = res3[i].replace(/(-)/g, '')
        res33.push(str)
   }
   //console.log(res33, res33.length, 'res33')

   //res33 && res4  => regx
   for(let i = 0; i<res33.length; i++){
        if(res33[i] !== res4[i]){
            console.log(res33[i])
        }
   }
   console.log("---------------")

   //PattS
   let pattS = /[A-Z0-9]{2}(-)[A-Z0-9]{2}(-)[A-Z0-9]{2}(\s+)\(hex\)(\s+)(.+)[\r\n]/g
   let resS = data.match(pattS)
   console.log(resS, 'resS', resS.length)
   let nextR = []
   for(let i = 0; i<resS.length; i++){
        let str = resS[i].replace(/[A-Z0-9]{2}(-)[A-Z0-9]{2}(-)[A-Z0-9]{2}(\s+)\(hex\)(\s+)/g, '')
        nextR.push(str)
   }
   //console.log( nextR, resS.length, nextR.length, 'nextR')
  //res2 && nextR => regx
   for(let i = 0; i<res2.length; i++){
        if(res2[i] !== nextR[i]){
            console.log(res2[i])
        }
   }

   //resArr
   let resArr = []
   for(let i = 0; i<res2.length; i++){
        let obj = {}
        obj[res3[i]] = res2[i]
        obj[res4[i]] = nextR[i]
        resArr.push(obj)
   }
   //console.log(resArr, resArr.length, 'resArr')
   let objS = {"listMac": resArr}
   console.log(objS.listMac.length, 'objS')

   // fs.writeFile('./test3.json', JSON.stringify(objS, null, '\t'), function(err){
   //      if(err) {
   //          throw err;
   //      }
   //  })  

   //\r
   let replaceR = [], replaceRR = [];
   for(let i = 0; i<res2.length; i++){
      let str = res2[i].replace(/[\r]/g, '')
      let str2 = nextR[i].replace(/[\r]/g, '')
      replaceR.push(str)
      replaceRR.push(str2)
   }
   let replaceR2 = []
   for(let i = 0; i<replaceR.length; i++){
        let obj = {}
        obj[res3[i]] = replaceR[i]
        obj[res4[i]] = replaceRR[i]
        replaceR2.push(obj)
   }
   console.log(replaceR, 'replaceR2')

  let replaceS = { "list": replaceR2 }
  //console.log(replaceR2, 'replaceR2')
  //test4.json
 // fs.writeFile('./test4.json', JSON.stringify(replaceS, null, '\t'), function(err){
 //    if(err){
 //      throw err
 //    }
 // })  

});  


//home
app.get('/home', function(req, res){
    //res.send('this is home')
    //fs.readFileSync
    // var data = fs.readFileSync('./test.txt'); //读取文件
    // var myStr = data.toString(); 
    // res.send(myStr)

    let data = fs.readFileSync('./test2.json');
    //let myStr = data.toString();
    //console.log(myStr, 'myStr')

    let obj = JSON.parse(data)
    let objList = obj.listMac
    //console.log(objList.length, 'obj')

    // let aa = []
    // let reg = /[.+][\r]/g
    // for(let i = 0; i<objList.length; i++){
    //     let str = objList[i]..replace(reg, '')
    //     aa.push(str)
    // }
    // console.log(aa)
    

})



const obj = path.parse('./test.txt');
//console.log(obj)

//const obj2 = path.parse(url)
//console.log(obj2)

let url2 = path.format({
    dir:'http://standards-oui.ieee.org',
    base: 'oui.txt'
})
//console.log(url2)

//file
app.get('/file', function(req, res){
    //res.send(url2)

    // fs.readFile('./test.txt', 'utf-8', function(err, data){
    //     if(err){
    //         throw err;
    //     }
    //     res.send(data)
    // })
})


//writeFile
// 写入文件内容（如果文件不存在会创建一个文件）
// 传递了追加参数 { 'flag': 'a' }
app.get('/wfile', function(req, res){
    res.send("wfile")
    // fs.writeFile('./test.json', 'hhh', { 'flag': 'a' }, function(err){
    //     if(err) {
    //         throw err;
    //     }
     
    //     // 写入成功后读取测试

    //     fs.readFile('./test.json', 'utf-8', function(err, data){
    //         if(err){
    //             throw err
    //         }
    //         console.log(data)
    //     })
    // });
})

//wwFile
app.get('/wwFile', function(req, res) {

    res.send("this is wwFile")
    // fs.readFile('./test.txt', 'utf-8', function(err, data){
    //     if(err){
    //         throw err;
    //     }
    //     //res.send(data)
    //     fs.writeFile('./test2.json', data, { 'flag': 'a' }, function(err){

    //         if(err){
    //             throw err
    //         }

    //     })
    // })

})

//unLink
app.get('/delFile', function(req, res) {

    res.send('this is delFile')
    // fs.unlink('./test.json', function(err) {
    //     if(err){
    //         throw err
    //     }
    //     console.log('success')

    // })

})

//testFile
app.get('/testFile', function(req, res){

    res.send('this  is testFile')
    fs.readFile('./test.json', 'utf-8', function(err, data){
        if(err){
            throw err;
        }
        console.log(data)

    })

})



app.listen(3000)

console.log('the port is listening at 3000')

