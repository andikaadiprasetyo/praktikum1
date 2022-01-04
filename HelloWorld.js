const fs = require('fs');

// Membuat File baru bernama Hello.txt
fs.writeFileSync("Hello.txt", "Hello There");  // fs.writeFileSync([nama file]], [konten file])
