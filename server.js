const express = require('express');
const revealRunInTerminal = require('reveal-run-in-terminal');
 
let app = express();
 
app.use(revealRunInTerminal());
app.use(express.static('node_modules/reveal.js'));
 
app.listen(5000);