'use strict';

const { spawn, exec } = require('child_process');
const net = require('net');
const path = require('path');

function getFreePort() {
    return new Promise((resolve, reject) => {
        const srv = net.createServer();
        srv.listen(0, () => {
            const port = srv.address().port;
            srv.close(() => resolve(port));
        });
        srv.on('error', reject);
    });
}

async function main() {
    const port = await getFreePort();
    const reportDir = path.resolve(__dirname, '..', 'allure-report');

    spawn('npx', ['--yes', 'http-server', reportDir, '-p', String(port), '--cors'], {
        detached: true,
        stdio: 'ignore',
    }).unref();

    await new Promise(r => setTimeout(r, 2000));

    exec(`xdg-open http://localhost:${port}`);
    console.log(`\n📊  Allure Report: http://localhost:${port}\n`);
}

main().catch(console.error);
