const fs = require('fs');


// creating a new function to use async / await syntax
const read_csv = async (filePath) => {

    const fileContent = await new Promise((resolve, reject) => {
        return fs.readFile(filePath, { encoding: 'utf8' }, (err, data) => {
            if (err) {
                return reject(err);
            }
            return resolve(data);
        });
    });
    // printing the file content
   return fileContent;
}
const dataFrame = (value,COL)=>{
    return value.split("\n").map((v,i)=>{
        return v.split(",")?.[COL]
    })
  }

// calling the async function to get started with reading file etc.
module.exports={
    read_csv,
    dataFrame
}