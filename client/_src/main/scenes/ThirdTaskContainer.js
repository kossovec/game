import {Facade} from "../../model/Facade";
import {Sprite} from "pixi.js";
import { Emitter } from 'pixi-particles';

export class ThirdTaskContainer extends PIXI.Container {
    constructor(){
        super();
        this._config = Facade.config;
        this._lastTime = 0;
        let fireConfig = this._config.particleConfig.get("fire");

        this._fountainOfCoinsEmitter = new Emitter(new PIXI.Container, fireConfig.images, fireConfig.data);
        // this._fountainOfCoinsEmitter.particleConstructor = AnimatedParticle;
        // this._fountainOfCoinsEmitter.parent.visible = false;
        // this.addChild(this._fountainOfCoinsEmitter);
        this.addChildAt(this._fountainOfCoinsEmitter.parent, 0);
        // this._fountainOfCoinsEmitter.emit = true;
    }

    onResize(){
        this._fountainOfCoinsEmitter.updateOwnerPos(this._config.screenSizeData.size.x * 0.5, this._config.screenSizeData.size.y * 0.7);
        this._fountainOfCoinsEmitter.emit = true;
        // this._fountainOfCoinsEmitter.scale.set(this._config.screenSizeData.scale);
    }


    onRender(){
        // let currentTime = Date.now();
        // let passedTime = (currentTime - this._lastTime) / 1000;
        this._fountainOfCoinsEmitter.update(0.016);
        // this._lastTime = currentTime;
    }
}