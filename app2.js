const express = require('express')
const app = express()
const router = express.Router()
const fs = require('fs')

app.get('/', function(req, res) {
  res.send('hello world');
});


// GET method route
app.get('/gets', function (req, res) {
  res.send('GET request to the homepage');
});

// POST method route
app.post('/gets', function (req, res) {
  res.send('POST request to the homepage');
});

// 匹配 /random.text 路径的请求
app.get('/aa.text/aa', function(req, res){
	res.send('<h1>hhhhhh<h1><br /><a href="https://www.baidu.com" title="herf">百度一下</a>')
})

	
//readfile
app.get('/fileRead', function(req, res){
	//data
	// var data = fs.readFileSync('./test.txt'); //读取文件
	//res.send('ddd')

	fs.readFile('./aa.json', 'utf-8', function(err, data){

		if(err){
			throw err
		}
		//JSON.stringify(data, null, '\t')
		// console.log(data)
		// console.log(typeof data)

		//dataObj
		let dataObj = JSON.parse(data)
		// console.log(dataObj instanceof Object)
		// console.log(typeof dataObj)
		//console.log(dataObj.listMac)

		//for--patt
		let listMac = dataObj.listMac
		let patt = /(\s*)[\\r]/g
		let str = JSON.stringify(listMac[0])
		//console.log('str', str)

		let arr = str.match(patt)
		//console.log('arr', arr)

		let str2 = str.replace(patt, '')
		//console.log('str2', str2)

		let oArr = []
		for(let i = 0; i<listMac.length; i++){
			
			let strS = JSON.stringify(listMac[i])
			let strS2 = strS.replace(patt, '')
			let strS3 = strS2.replace(/\\/g, '')
			oArr.push(strS3)
		}
		console.log('oArr', oArr)
		let objS = { "list": oArr }
		console.log('objS', objS)
		res.send(oArr)
		//fs.writeFile
		fs.writeFile('./bb.json', JSON.stringify(objS, null, 4), function(err){

			if(err){
				throw err
			}

		})

	})

})

//fileWrite
app.get('/fileWrite', function(req, res){

	res.send('fileWrite')
	//fs.readFile
	fs.readFile('./test.txt', 'utf-8', function(err, data){
		if(err){
			throw err
		}
		//console.log(data)
		console.log(typeof data)


		// B0-93-5B   (hex)		ARRIS Group, Inc.
		// B0935B     (base 16)		ARRIS Group, Inc.
		// 		6450 Sequence Drive
		// 		San Diego  CA  92121
		// 		US
		//patt 
		//let pattS = /[A-Z0-9]{2}(-)[A-Z0-9]{2}(-)[A-Z0-9]{2}(\s+)\(hex\)(\s+)(.+)[\r\n]/g
		let patt = /[A-Z0-9]{2}(-)[A-Z0-9]{2}(-)[A-Z0-9]{2}(\s+)\(hex\)(\s+)(.+)(\r\n)/g
		let arr = data.match(patt)

		//patt2
		let patt2 = /[\t]{4}(.+)(\r\n)/g
		let arr2 = data.match(patt2)
		//console.log(arr2)

		//patt3
		let patt3 = /[\t]{4}(.+|\n+)[\r\n]/g
		let arr3 = data.match(patt3)
		//console.log(arr3)
		let arr5 = []
		for(let i = 0; i<arr3.length; i++){
			let str = arr3[i].replace(/[\t]{4}/g, '')
			arr5.push(str)
		}
		//console.log(arr5, 'arr5')
		let obj5 = { "list": arr5 }

		let arr6 = []
		for(let i = 0; i<arr5.length; i++){
			let str = arr5[i].replace(/\r/g, '')
			arr6.push(str)
		}
		//console.log(arr6)

		let arr7 = JSON.stringify(arr6, null, '\t')
		//console.log(arr7, 'arr7')

		let arr8 = []
		//var i=0,len=dataArr.length;i<len;i+=3
		for(var i = 0, len=arr6.length; i<len; i+=3){
			arr8.push(arr6.slice(i, i+3))
		}
		//console.log(arr8, 'arr8')

		//
		// let arr88 = []
		// for(let i = 0; i<arr8.length; i++){
		// 	let str = ''
		// 	for(let j = 0; j<arr8[i].length; j++){
		// 		str += arr8[i][j]
		// 	}
		// 	arr88.push(str)
		// }
		// console.log(arr88, 'arr88')
		// fs.writeFile('./dd.json', JSON.stringify(arr88, null, 4), function(err){
		// 	if(err){
		// 		throw err
		// 	}
		// })

		// let arr9 = JSON.stringify(arr8, null, 4)

		// fs.writeFile('./aa.json', arr9, function(err){
		// 	if(err){
		// 		throw err
		// 	}
		// })

		//arr66 --cc.json
		let arr66 = []
		for(let i = 0; i<arr6.length; i += 3){
			let str = arr6.slice(i, i+3).join('  ')
			arr66.push(str)
		}

		let arr666 = [], sp = 'sitePlace'
		for(let i = 0; i<arr66.length; i++){
			let obj = {}
			obj[sp] = arr66[i];
			arr666.push(obj)
		}

		let obj66 = { "list": arr666 }
		console.log(arr66, 'arr66')
		fs.writeFile('./ccc.json', JSON.stringify(obj66, null, 4), function(err){
			if(err){
				throw err
			}
		})

		// let obj6 = { "list6": arr6 }

		// fs.writeFile('./cc.json', JSON.stringify(obj6, null, 4), function(err){
		// 	if(err){
		// 		throw err
		// 	}
		// })

		//let obj3 = { "list": arr3 }
		//console.log(obj3.list)

		
		//https://segmentfault.com/q/1010000004921251/a-1020000004921566
		//let arr4 = []
		// for(let i = 0; len = arr3.length; i<len; i+=3){
		// 	arr4.push(arr3.slice(i, i+3))
		// }
		// console.log(arr4)

		//fs.writeFile
		// fs.writeFile('./cc.json', JSON.stringify(obj3, null, 4), function(err){
		// 	if(err){
		// 		throw err
		// 	}
		// })

	})

})

//listen
app.listen(3001, function(){
	console.log('app is listening at 3001')
})