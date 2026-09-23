// Probe script: create branch chore/shared-repin from main, write shared/sync.lock.json, commit.
// Runs inside the SyncProbe workflow (git already checked out).
import { execSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';

const run = (cmd) => execSync(cmd, { stdio: 'inherit' });

try {
  run('git checkout -B chore/shared-repin origin/main');
} catch {
  run('git checkout -B chore/shared-repin');
}
mkdirSync('shared', { recursive: true });
writeFileSync('shared/sync.lock.json', JSON.stringify({ sha: 'deadbeef' }, null, 2) + '\n');
run('git add shared/sync.lock.json');
run('git -c user.email=bot@bot -c user.name=bot commit -m "chore: repin shared lock"');
console.log('probe commit created on chore/shared-repin');
