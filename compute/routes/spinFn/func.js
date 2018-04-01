output = "";
fs = require('fs');
try {
	input = fs.readFileSync('/dev/stdin').toString();
	var cleanInput = input.replace('\n', ' ');
	output = eval(cleanInput)
} catch(e) {}
console.log(output);
