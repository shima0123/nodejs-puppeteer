const puppeteer = require('puppeteer');
const fs = require('fs');
// const readline = require('readline');
// const util = require('util')
// const readAsync = util.promisify(fs.readFile)

// async function init() {
// 	let data = await readAsync('input.txt')

// 	data = JSON.parse(data)
// 	console.log(data.name)
// }

//init()
// function foo(str) { var temp = str.split(/[\n,]/g);
// 	for (var i = 0; i < temp.length; i++) {
// 		// if(temp[i] == ""){ temp.splice(i, 1); i--; }
// 	}
// 	console.log(temp);
// }
//foo("123,\naa,,,,,\n\n\n\n\n1");
(async () => {
	//var urltxt = new Array() 
	await fs.readFile('input.txt', 'utf-8', async (err, data) => {
		if (err) throw err;
		//console.log(data);
		const browser = await puppeteer.launch({headless:false});
		const page = await browser.newPage();
		var urltxt = await data.split(/[\r\n]/g)
		//		for (var i = 0; i < urltxt.length; i++)  if (urltxt[i] == "") { await urltxt.splice(i, 1); i--; }
		for (var i = 0; i < urltxt.length; i++) {
			if (urltxt[i] == "") {
				await urltxt.splice(i, 1); i--;
			}
			else {
				try {
					inputsource = await urltxt[i].split(/[,]/g)
					urlid = await inputsource[0]
					urlpath = await inputsource[2]
					await page.goto(urlpath, { waitUntil: 'networkidle2' })
					const htmlf = await page.content()
					await fs.writeFileSync('./output/' + urlid + '.html', htmlf);
					await console.log(urlid)
				}
				catch (error) { 
					await fs.appendFile(__dirname + '/test.csv', urlid+','+urlpath +'\n',function () {
	});				//await fs.writeFileSync('./errinfo.txt', urlid+'\n');
					continue }
			}
		}
		await browser.close();
	});
})();
