const fs = require('fs');
// const result = [];

fs.readFile('./c.txt', 'utf-8', (err, data) => {
  const res = [];
	if (err) return console.error('Error reading file:', err);
	const splitted = data.toString().split('\n');

	splitted.forEach(line => {
    const newObj = {};
		// newObj.line = line;
    newObj.code = line.substring(0, 8);
    newObj.title = line.substring(8).trim();
    res.push(newObj);
	});
  // console.log(JSON.parse(res));
  fs.writeFileSync('./courses.json', JSON.stringify(res, null, 2), err => {
    if (err) return console.error('Error writing file:', err);
  });
  // console.log(res)
});

// fs.writeFileSync('./courses.json', JSON.stringify(result, null, 2), err => {
// 	if (err) return console.error('Error writing file:', err);
// });
