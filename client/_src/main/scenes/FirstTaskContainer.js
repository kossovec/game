import {Sprite} from "pixi.js";
import {Facade} from "../../model/Facade";

export class FirstTaskContainer extends PIXI.Container{

    constructor() {
        super();
        let elementQuantity = 144;
        this._animationDuaration = 2 * 60;
        this._animatedSpriteArray =[];
        this._config = Facade.config;
        this._resizebleContainer = new PIXI.Container();
        this.addChild(this._resizebleContainer);

        this._textureArray = ["spinObj_02.png", "bunny.png", "eggHead.png", "button.png", "spinObj_01.png"];
        this._spriteArray = [];
        for(let i = 0; i < elementQuantity; i++) {
            this._spriteArray.push(this.createSprite());
        }
    }

    onResize(){
        this._resizebleContainer.x = this._config.screenSizeData.size.x * 0.3;
        this._resizebleContainer.y = this._config.screenSizeData.size.y * 0.5;
        this._resizebleContainer.scale.set(this._config.screenSizeData.scale);
    }

    onRender(){
        if(this._spriteArray!== undefined ) {
            if(!this._animationDilay--){
                this._animationDilay = 60;
            this._spriteArray.length >0 && this._animatedSpriteArray.push(this._spriteArray.pop());
            }
            if(this._animatedSpriteArray) {
                this._animatedSpriteArray.forEach((value, index, array) => {
                    if(value.animationDuaration == undefined){
                        value.animationDuaration = this._animationDuaration;
                    }

                    if(value.animationDuaration-- > 0){
                       if(value.animationDuaration < this._animationDuaration / 2 && value.isSwitch === undefined && array[index -1] !== undefined){
                           this._resizebleContainer.children.splice(this._animatedSpriteArray.length -1,0,this._resizebleContainer.children.pop());
                           value.isSwitch = true;
                       }
                       value.x += value.lenPerTic.x;
                       value.y += value.lenPerTic.y;
                    }
                })
            }
        }
    }

    createSprite () {
        let index = Math.floor(Math.random() * this._textureArray.length);
        let sprite = new Sprite(PIXI.utils.TextureCache[this._textureArray[index]]);
        sprite.anchor.set(0.5);
        sprite.x = (Math.random() * 40) -20;
        sprite.y = (Math.random() * 40) -20;
        sprite.destPosition = {
            x: 500 + (Math.random() * 40) -20,
            y: (Math.random() * 40) -20
        };
        let vec = {x: sprite.destPosition.x - sprite.x, y: sprite.destPosition.y - sprite.y};
        let vecL = vec.x ** 2+ vec.y **2;
        let vecN = {x: vec.x * (vecL !== 0 ? 1 / vecL : 0), y: vec.y * (vecL !== 0 ? 1 / vecL : 0)};
        sprite.speed = vecL / this._animationDuaration;
        sprite.lenPerTic = {x: vecN.x * sprite.speed, y: vecN.y * sprite.speed};
        sprite.scale.set(this._config.screenSizeData.scale);
        this._resizebleContainer.addChild(sprite);
        return sprite;
    }







}