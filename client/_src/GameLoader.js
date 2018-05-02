'use strict';

import {Main} from "./main/Main";
import {Facade} from "./model/Facade";
import {ParseConfig} from "./config/ParseConfig";

export class GameLoader {

    constructor() {
        new Facade();
        let gameConfig = "./data/game_config.json";
        this.parseConfig(gameConfig);
        this.main = new Main();
        this.main.init();
    }

    jsonLoader(fileName) {
        return new Promise((resolve, reject) => {
            fetch(fileName).then(response => {
                if (!response.ok) {
                    reject(response);
                } else {
                    response.json()
                        .then(resolve)
                        .catch(reject);
                }
            }).catch(reject);
        });
    }

    parseConfig(gameConfig){
        this.jsonLoader(gameConfig).then(data=>{
            new ParseConfig(Facade.config, data);
            console.log(data);
        })
    }
 }
