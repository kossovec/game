import {RenderManager} from "../manager/RenderManager";
import {ResourceLoader} from "../loader/ResourceLoader";
import {MainSceneContainer, setup} from "./scenes/MainSceneContainer";
import {ResizeService} from "../service/ResizeService";
import {GameCongig} from "../config/GameConfig";
import {Facade} from "../model/Facade";

export class Main {
    constructor () {
        this._render = new RenderManager();
        this._config = Facade.config;
        this._resourseLoader = new ResourceLoader();
        this._resizeService = new ResizeService();
    }

    init() {
        this._resourseLoader.load(this._config.gameResourse, this.setup.bind(this));
        this._resizeService.onResize(this.onResize.bind(this));

    }

    setup() {

        this._render.onRenderCallback = this.onRender.bind(this);
        this._render.create(this._config.designWidth, this._config.designHeight);
        document.body.appendChild(this._render.getCanvasElement());
        this.onResize();
        this.setupChildren();
    }

    onRender(){
        if(this._mainScene) {
            this._mainScene.onRender();
        }
    }

    onResize(){
        let screenResolution = this._resizeService.getScreenResolution();
        let designWidth = this._config.desktopBaseWidth;
        let designHeight = this._config.desktopBaseHeight;
        let designRatio = designWidth / designHeight;

        if (__DESKTOP__) {
            if (screenResolution.width > screenResolution.height) {
                this._config.screenSizeData.size.x = Math.round(Math.min(screenResolution.height * designRatio, screenResolution.width));
                this._config.screenSizeData.size.y = Math.round(Math.min(this._config.screenSizeData.size.x / designRatio, screenResolution.height));
            } else {
                this._config.screenSizeData.size.y = Math.round(Math.min(screenResolution.width / designRatio, screenResolution.height));
                this._config.screenSizeData.size.x = Math.round(this._config.screenSizeData.size.y * designRatio);
            }
        } else {
            this._config.screenSizeData.size.x = screenResolution.width;
            this._config.screenSizeData.size.y = screenResolution.height;
        }

        this._config.screenSizeData.scale = Math.min(this._config.screenSizeData.size.x / this._config.desktopBaseWidth, this._config.screenSizeData.size.y / this._config.desktopBaseHeight);
        this._config.screenSizeData.divergence.x = this._config.screenSizeData.size.x / this._config.screenSizeData.scale / this._config.designWidth;
        this._config.screenSizeData.divergence.y =this._config.screenSizeData.size.y / this._config.screenSizeData.scale / this._config.designHeight;

        this._render.onResize({width:this._config.screenSizeData.size.x, height: this._config.screenSizeData.size.y});
        if(this._mainScene) {
            this._mainScene.onResize();
        }

    }



    setupChildren() {
        this._mainScene = new MainSceneContainer();
        this._mainScene.setup();
        this._render.objectToRender = this._mainScene;
    }
}