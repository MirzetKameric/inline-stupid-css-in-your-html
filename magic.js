const fs = require("fs");
const path = require("path");
const axios = require('axios');
const isLocal = typeof process.pkg === "undefined";
const basePath = isLocal ? process.cwd() : path.dirname(process.execPath);

const files= ['YOUR FILE NAMES HERE i.e index, team']
const buildDir = path.join(`${basePath}/`, "/YOUR_BUILD_DIRECTORY")
if (fs.existsSync(buildDir)) {
    fs.rmdirSync(buildDir, { recursive: true });
}
fs.mkdirSync(buildDir);

const runMagic = async (file) => {
    console.log(`***Running magic for ${file}.html***`)
    let htmlFile = fs.readFileSync(`${basePath}/${file}.html`, {encoding: 'utf8'})
    const regex = /href="\w.*\.css"/i
    const arrayOfLines = htmlFile.split(/\n/)
    const filtered = arrayOfLines.filter(s=>~s.indexOf('.css'));
    const results = []
    filtered.forEach(item => {
        results.push(regex.exec(item)[0].replaceAll('"', '').replace('href=', ''))
    })

    let styleCode = ''
    for (let i = 0; i < results.length; i++) {
        const url = results[i]

        if (url.includes('http')) {
            const response = await getResource(url)
            styleCode += response.data + ' '
        } else {
            const response = getLocalResource(url)
            styleCode += response + ' '
        }
    }

    htmlFile = deleteAllCssImports(htmlFile, filtered)

    const headEnd = htmlFile.indexOf("</head>")
    htmlFile = htmlFile.slice(0, headEnd) + `<style>${styleCode}</style>`  + htmlFile.slice(headEnd)

    fs.writeFileSync(
        `${buildDir}/${file}.html`,
        htmlFile
    );

    console.log(`*** Successful magic for ${file}.html ***`)
}

const getResource = async (url) => {
    return await axios.get(url)
}

const getLocalResource = (path) => {
    return fs.readFileSync(`${basePath}/${path}`, {encoding: 'utf8'})
}

const deleteAllCssImports = (htmlFile, filtered) => {
    for (let i = 0; i < filtered.length; i++) {
        const item = filtered[i]
        const start = htmlFile.indexOf(item)
        const end = htmlFile.indexOf('>', start) + 1
        htmlFile = htmlFile.slice(0, start) + htmlFile.slice(end)
    }

    return htmlFile
}

const doYourThing = async () => {
    for (let i = 0; i < files.length; i++) {
        const file = files[i]
        await runMagic(file)
    }
}

doYourThing()


