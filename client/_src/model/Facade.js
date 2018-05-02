import {GameConfig} from "../config/GameConfig";

export class Facade {

    constructor(){
        Facade._config = new GameConfig();
    }

    static get config()
    {
        return Facade._config;
    }


}