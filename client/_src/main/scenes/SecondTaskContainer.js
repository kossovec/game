import {TextImageWidget} from "../widget/TextImageWidget";
import {Facade} from "../../model/Facade";

export class SecondTaskContainer extends PIXI.Container {

    constructor(){
        super();
        this._config = Facade.config;
        this._textImageWidget = new TextImageWidget();
        this.addChild(this._textImageWidget);
        this.onRender();
    }

    onResize(){
        this._textImageWidget.x = this._config.screenSizeData.size.x * 0.5;
        this._textImageWidget.y = this._config.screenSizeData.size.y * 0.5;
        this._textImageWidget.scale.set(this._config.screenSizeData.scale);
    }

    onRender(){
        if(!this._animationDilay--){
            this._animationDilay = 120;
            this._textImageWidget.updateWidget();
        }

    }
}