import fs from 'fs';
const d = JSON.parse(fs.readFileSync('d:/workT/wx_smallPrograms/qingzao-homepage/src/data/posts/posts-zh.json','utf8'));
console.log('✅ JSON 有效，共 ' + d.length + ' 篇');
const c = {};
d.forEach(p => { c[p.category] = (c[p.category] || 0) + 1; });
console.log('📊 分类统计:');
Object.entries(c).forEach(([k,v]) => console.log('  ' + k + ': ' + v + '篇'));
