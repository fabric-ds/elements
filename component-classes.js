import * as classes from '@fabric-ds/css/component-classes';

console.log('<html>')
console.log('<head>')
console.log('</head>')
console.log('<body>')
for (const classObjects of Object.values(classes)) {
    if (typeof classObjects === 'string') {
        console.log(`<span class="${classObjects}"></span>`);
    } else {
        for (const classStrings of Object.values(classObjects)) {
            if (classStrings) console.log(`<span class="${classStrings}"></span>`)
            // console.log(classStrings)
        }
    }
}
console.log('</body>')
console.log('</html>')