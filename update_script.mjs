import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const directoryToSearch = __dirname;
const directoriesToInclude = ['app', 'components', 'lib', 'public'];

function walkSync(dir, filelist = []) {
  if (!fs.existsSync(dir)) return filelist;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file === 'node_modules' || file === '.next' || file === '.git' || file === 'public' && file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')) continue;
    const filepath = path.join(dir, file);
    const stat = fs.statSync(filepath);
    if (stat.isDirectory()) {
      filelist = walkSync(filepath, filelist);
    } else {
      if (filepath.endsWith('.ts') || filepath.endsWith('.tsx') || filepath.endsWith('.js') || filepath.endsWith('.json') || filepath.endsWith('.md')) {
        filelist.push(filepath);
      }
    }
  }
  return filelist;
}

async function updateFiles() {
  let files = [];
  for (const dir of directoriesToInclude) {
    files = walkSync(path.join(directoryToSearch, dir), files);
  }
  
  files.push(path.join(directoryToSearch, 'package.json'));

  let replaceCount = 0;
  for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;
    
    // Replace the strings
    content = content.replace(/BEYOND WORK FROM EVERYWHERE/g, 'BEYOND WORK');
    content = content.replace(/Beyond Work From Everywhere/g, 'Beyond Work');
    content = content.replace(/beyond-work-from-everywhere/g, 'beyond-work');
    
    if (content !== original) {
      fs.writeFileSync(file, content, 'utf8');
      replaceCount++;
    }
  }
  console.log(`Updated ${replaceCount} files with text replacements.`);
}

async function run() {
  try {
    await updateFiles();
    console.log("Done.");
  } catch (err) {
    console.error(err);
  }
}

run();
