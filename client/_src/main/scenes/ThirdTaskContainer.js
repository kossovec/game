import {Facade} from "../../model/Facade";
import {Sprite} from "pixi.js";
import { Emitter } from 'pixi-particles';

export class ThirdTaskContainer extends PIXI.Container {
    constructor(){
        super();
        this._config = Facade.config;
        let fireConfig = this._config.particleConfig.get("fire");

        this._fountainOfCoinsEmitter = new Emitter(new PIXI.Container, fireConfig.images, fireConfig.data);
        this.addChildAt(this._fountainOfCoinsEmitter.parent, 0);
    }

    onResize(){
        this._fountainOfCoinsEmitter.updateOwnerPos(this._config.screenSizeData.size.x * 0.5, this._config.screenSizeData.size.y * 0.7);
        this._fountainOfCoinsEmitter.emit = true;
    }

    onRender(){
        this._fountainOfCoinsEmitter.update(0.016);
    }
}