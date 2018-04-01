name = "World";
fs = require('fs');
try {
	input = fs.readFileSync('/dev/stdin').toString();
	if (input) {
		name = input;
	}
} catch(e) {}
console.log("Hello", name, "from Node!");
