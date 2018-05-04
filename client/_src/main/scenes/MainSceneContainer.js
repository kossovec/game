import {FirstTaskContainer} from "./FirstTaskContainer";
import {SecondTaskContainer} from "./SecondTaskContainer";
import {ThirdTaskContainer} from "./ThirdTaskContainer";
import {Sprite} from "pixi.js";
import {GameCongig} from "../../config/GameConfig";
import {Facade} from "../../model/Facade";

export class MainSceneContainer extends PIXI.Container {
    constructor() {
        super();
        this._config = Facade.config;
    }

    setup() {
        this.setupChildren();
    }
    setupChildren() {
        this._taskContanerArray = [];
        this._taskContanerArray.push(new FirstTaskContainer());
        this._taskContanerArray.push(new SecondTaskContainer());
        this._taskContanerArray.push(new ThirdTaskContainer());
        this._taskContanerArray.forEach(value => {
            this.addChild(value);
            value.visible = false;
        });
        this._taskContanerArray[0].visible = true;
        this.addSprite();


    }

    addSprite(){

        this.setupButtons();
        this.onResize();
    }

    onRender() {
        this._taskContanerArray.forEach((value) => {
            if(value.visible){
                value.onRender();
            }
        });
    }

    onResize(){
        this._buttons.forEach((value, index, array) => {
            value.x = this._config.screenSizeData.size.x * (0.25 * index + 0.25);
            value.y = this._config.screenSizeData.size.y * 0.1;
            value.scale.x = this._config.screenSizeData.scale * 0.9;
            value.scale.y = this._config.screenSizeData.scale * 0.9;
        });
        this._taskContanerArray.forEach((value) => {
            if(value.visible){
                value.onResize();
            }
        });
    }

    setupButtons() {
        this._buttons = [];
        for (let i = 0; i < 3; i++) {
            this._buttons.push(this.createButton(i));
        }
    }

    createButton(index) {
        let button = new Sprite(PIXI.utils.TextureCache["button.png"]);
        button.interactive = true;
        button.buttonMode = true;
        button.anchor.x = 0.5;
        button.anchor.y = 0.5;
        if(__DESKTOP__){
            button.on("click", this.onButtonClick.bind(this, index));
        } else {
            button.on("touchend", this.onButtonClick.bind(this, index));
        }
        this.addChild(button);
        return button;
    }

    onButtonClick(index){
        this._taskContanerArray.forEach(value => {
            value.visible = false;
        });

        this._taskContanerArray[index].visible = true;
        this._taskContanerArray[index].onResize();
    }

}