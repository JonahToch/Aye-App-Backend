const { exec } = require("child_process");

exports.web_backend_restart = function(req, res) {
    exec('pm2 restart aye', (err, stdout, stderr) => {
        console.log(stdout);
    });
    res.send('Restarted the aye app');
};