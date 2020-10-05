const exec = require('await-exec')

const ROOT_FROM_FOLDER = "/c/Users/benja/Documents/Projects/";
const ROOT_TO_FOLDER = "/c/Users/benja/ownCloud/Projects/";

async function run(cmd) {
    return await exec('"C:\\Program\ Files\\Git\\usr\\bin\\sh.exe" -c "' + cmd + '"')
}

(async () => {
    
    const currentFolder = (await exec('pwd'))
        .stdout
        .replace(/(\r\n|\n|\r)/gm,"")

    // Find gitignores
    const findResult = await exec('find ' + currentFolder + ' -name ".gitignore"')
    var folders = findResult.stdout.split(".gitignore\n")
    folders.pop()
    
    const promises = folders.map(folder => {
        const trimmedFolder = folder.replace(ROOT_FROM_FOLDER,"")
        const fromPath = ROOT_FROM_FOLDER + trimmedFolder
        const toPath = ROOT_TO_FOLDER + trimmedFolder
        return run('mkdir -p ' + ROOT_TO_FOLDER + trimmedFolder + ';'
            + 'cd ' + fromPath + ';'
            + 'git archive --format zip --output ' + toPath + 'zipfile.zip master;'
            + 'cd ' + toPath + ';'
            + 'unzip -o zipfile.zip;'
            + 'rm zipfile.zip;')
        })
    const results = await Promise.all(promises)
    results.forEach(result => {
        console.log(result.stdout)
        if (result.stderr !== "")
            console.log(result.stderr)
    })
})()