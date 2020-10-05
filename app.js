const exec = require('await-exec')
const args = require("args-parser")(process.argv)

async function run(cmd) {
    return await exec('"C:\\Program\ Files\\Git\\usr\\bin\\sh.exe" -c "' + cmd + '"')
}

(async () => {
    const currentFolder = (await exec('pwd')).stdout.replace(/(\r\n|\n|\r)/gm,"")

    const ROOT_FROM_FOLDER = currentFolder.replace(currentFolder.split('/').slice(-1)[0], "")
    const ROOT_TO_FOLDER = args.to.replace("C:", "/c")

    // Find git folders
    const findResult = await exec('find ' + currentFolder + ' -iname ".git"')
    var output = findResult.stdout.split("\n")
    output.pop()
    const folders = [...new Set(output.map(folder => folder.replace(/.git/g, "")))]
    
    // For each git and sub-git folders
    const promises = folders.map(folder => {
        const trimmedFolder = folder.replace(ROOT_FROM_FOLDER, "")
        const fromPath = ROOT_FROM_FOLDER + trimmedFolder
        const toPath = ROOT_TO_FOLDER + trimmedFolder
        return run('mkdir -p ' + ROOT_TO_FOLDER + trimmedFolder + ';' // Creates output folder
            + 'cd ' + fromPath + ';'
            + 'git archive --format zip --output ' + toPath + 'zipfile.zip master;' // Archive git folder
            + 'cd ' + toPath + ';'
            + 'unzip -o zipfile.zip;' // Unzip the archive
            + 'rm zipfile.zip;')
        })

    // Outputs the stdout and stderr
    const results = await Promise.all(promises)
    results.forEach(result => {
        console.log(result.stdout)
        if (result.stderr !== "")
            console.log(result.stderr)
    })
})()