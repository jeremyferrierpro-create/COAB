const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else {
            if (file.endsWith('.tsx') || file.endsWith('.ts')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk('client/src');
files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    
    // Replace the messy double/triple VITE_API_URL blocks with a clean one.
    // The messy block looks like: ${import.meta.env.VITE_API_URL || `\${import.meta.env.VITE_API_URL || 'http://localhost:3000'}`}
    content = content.replace(/\$\{import\.meta\.env\.VITE_API_URL.*?http:\/\/localhost:3000.*?\}\}/g, "${import.meta.env.VITE_API_URL || 'http://localhost:3000'}");
    
    // Also, some might be: ${import.meta.env.VITE_API_URL || 'http://localhost:3000'}
    // Let's just make sure we replace the specific bad strings exactly if regex is failing
    const badString1 = "${import.meta.env.VITE_API_URL || `\\${import.meta.env.VITE_API_URL || 'http://localhost:3000'}`}";
    const badString2 = "${import.meta.env.VITE_API_URL || `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}`}";
    
    content = content.split(badString1).join("${import.meta.env.VITE_API_URL || 'http://localhost:3000'}");
    content = content.split(badString2).join("${import.meta.env.VITE_API_URL || 'http://localhost:3000'}");

    fs.writeFileSync(f, content);
});
console.log('Done');
