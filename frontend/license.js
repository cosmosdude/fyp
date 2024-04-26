import nlf from 'nlf';
import {encode} from 'html-entities';

nlf.find({ directory: './', production: true,},  function (err, data) {
    // do something with the response object.
    // console.log("JSON", JSON.stringify(data), err);
    let text = "<div className='flex flex-col'>"
    for (const each of data) {
        if (each.version === '0.0.0') continue

        let licenses = encode(each.licenseSources.license.sources[0]?.text ?? "No License").replaceAll('`', '\'').split('\n')
text += `
<h2>${each.name} (v${each.version})</h2>
<a href="${each.repository}">Repository</a> <br/>
<code>

${licenses.filter(x => !!x).map(x => `<p>{\`${x}\`}</p>` ).join('\n')}
</code>
`
    }
    text += "</div>"
    // console.log(data[0])
    // console.log(data[0].name, data[0].version)
    // console.log(data[0].repository)
    // console.log(data[0].licenseSources.package)
    // console.log(data[0].licenseSources.license)

    console.log(text)
});
 
// to only include production dependencies
// nlf.find({
//     directory: './',
//     production: true
// }, function (err, data) {
//     // do something with the response object.
//     console.log(JSON.stringify(data));
// });