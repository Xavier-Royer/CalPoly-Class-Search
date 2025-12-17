import sqlite from "sqlite3"
import path from "path"
import fs from 'fs';

//const DB_PATH = path.resolve("./database/database.db");
const DB_PATH = path.join(process.cwd(), 'src', 'database', 'database.db');

console.log(String(DB_PATH) + " THISIS MY PATH");
console.log('DB exists? ', fs.existsSync(DB_PATH));


const db = new sqlite.Database(DB_PATH);



export function get_all_courses() {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM courses", (err,rows) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(rows);
            }
        });
    })
}

export function get_coures_by_key_word(word, prereqs, credits){
    return new Promise((resolve, reject) =>{
        console.log("IN DATABASE FUNCTION");
        console.log(word != "null");
        let slq  = "SELECT * FROM courses WHERE 1=1";
        let parameters = [];
        console.log("before first if staement")

        if (word != null){
            console.log("SEARCHING FOR WORD" + word);
            slq += " AND (description like ? OR major_id like ?)";
            parameters.push(`%${word}%`);
            parameters.push(`%${word}%`);
        }

        console.log("passed first if staement")

        if (prereqs != "null"){
            console.log("SEARCHING FOR PREREQS" + prereqs)
            slq += " AND prerequisites = ?"
            parameters.push("NONE")
        }

        if (credits != "null") { 
            console.log("SEARCHING FOR credits" + credits)
            slq += " AND (max_credits >= ? AND min_credits <= ?) "
            parameters.push(credits)
            parameters.push(credits)
        }

        console.log("FINAL SQL QUERY: " + slq)

        db.all(slq, parameters, (err,rows) => {
            if (err){
                reject(err)
            }
            else {
                resolve(rows)
            }
        });
    });
}