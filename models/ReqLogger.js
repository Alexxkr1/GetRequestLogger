const fs = require('fs')
const path = require('path')

const FilePath = path.join(path.dirname(require.main.filename), 'data', 'ReqLogger.json')

module.exports = class Log {
    constructor(log){
        this.time = log
    }

    saveLog(){
        //read file content first
        fs.readFile(FilePath, (error, fileContent) => {
            let Logs = [];

            if (!error) {
                Logs = JSON.parse(fileContent)                
            }
            else {
                console.log(error);
            }
            Logs.push(this)

            fs.writeFile(FilePath, JSON.stringify(Logs),(error)=>{
                if (!error) {
                    console.log('New log');
                }
            })
        })
    }

    static fetchLogs(callback){
        fs.readFile(FilePath, (error, fileContent) => {
            if (error) {
                callback([])
            }
            callback(JSON.parse(fileContent))
        })
    }
}
