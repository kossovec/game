import {Sprite} from "pixi.js";

export class TextImageWidget  extends  PIXI.Container{
    constructor(){
        super();
        this._pull = [];
        this._textureArray = ["spinObj_02.png", "bunny.png", "eggHead.png", "button.png", "spinObj_01.png"];
        this._pull.push(new PIXI.Text("PixiJS"));
        this._pull.push(new PIXI.Text("PixiJS"));
        this._pull.push(new PIXI.Text("PixiJS"));
        this._pull.push(new Sprite(PIXI.utils.TextureCache[this._textureArray[Math.floor(Math.random() * this._textureArray.length)]]));
        this._pull.push(new Sprite(PIXI.utils.TextureCache[this._textureArray[Math.floor(Math.random() * this._textureArray.length)]]));
        this._pull.push(new Sprite(PIXI.utils.TextureCache[this._textureArray[Math.floor(Math.random() * this._textureArray.length)]]));
        this._pull.forEach(value => {
            this.addChild(value);
            value.visible = false;
        });
    }

    updateWidget(){
        this._pull.forEach(value => {
            this.addChild(value);
            value.visible = false;
        });
        let shuffleArray =this.shuffle(this._pull);

        for (let i = 0; i < 3; i++) {
            let element = shuffleArray[i];
            element.visible = true;
            if ('style' in element) {
                element.style = this.getRandomTextOption();
            }
            element.x = (Math.random() * 40) -20;
            element.y = (Math.random() * 40) -20;
        }
    }


    getRandomTextOption(){
        return {
            fontSize: Math.floor(Math.random() * 40) + 20
        }
    }

    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

}