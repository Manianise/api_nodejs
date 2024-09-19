'use strict';

import { promises as fs } from 'fs';
import path from "path";
import { sequelize } from '../config/config.js';
const __filename = import.meta.filename
const __dirname = import.meta.dirname

/**
 * @async synchronizes models in current directory with external database
 */
export async function loadModels() {
    const files = await fs.readdir(__dirname);

    for (const file of files) {

        if (path.extname(file) === '.js' && file.slice(file, -3) !== 'index') {
            let model = file.slice(file, -3)
            try {
                await import(`./${file}`)
                .then(instance => {
                    instance.default.sync();
                    console.log(`${model} was successfully created`);
               })
            } catch (error) {
                console.log(`Something went wrong : ${error}`);
                
            }
            
        }

    }    

}
