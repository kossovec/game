import {CanvasRenderer, WebGLRenderer} from "pixi.js";
import {} from '../../libs/fpsmeter.js'


export class RenderManager {

    create(width, height) {
        if (__DEV__) {
                this.fpsMeter = new FPSMeter(document.body, {
                    graph: 1, // Whether to show history graph.
                    history: 20,
                    left: __MOBILE__ ? "60px" : "5px",
                    position: "fixed",
                    maxFps: 1000,
                    theme: "light" //Meter theme. Build in: 'dark', 'light', 'transparent', 'colorful'.
                });

        }
        this.renderer = this.createRenderer(width, height);
    }


    createRenderer(width, height) {

        const renderer = PIXI.autoDetectRenderer(width, height, {backgroundColor: 0x61639});
        Object.assign(renderer.view.style, {
            position: "fixed",
            top: 0,
            left: 0
        });
        PIXI.ticker.shared.add(this.onTick, this);
        return renderer;
    }

    onTick() {
        this.render();
    }

    render() {
        if (this._objectToRender) {
            this.renderer.render(this._objectToRender);
        }

        if (__DEV__ && this.fpsMeter) {
            //Count FPS for testing purposes
            this.fpsMeter.tick();
        }
        this._onRenderCallback();
    }

    getCanvasElement() {
        return this.renderer.view;
    }

    set objectToRender(value) {
        this._objectToRender = value;
    }

    set onRenderCallback(value) {
        this._onRenderCallback = value;
    }

    onResize(data) {

        let width = data.width;
        let height = data.height;

        let canvas = this.getCanvasElement();

        canvas.style.width = width + "px";
        canvas.style.height = height + "px";
        canvas.style.left = (window.innerWidth / 2 - width / 2) + "px";
        canvas.style.right = (window.innerWidth / 2 + width / 2) + "px";

        canvas.style.top = (window.innerHeight / 2 - height / 2) + "px";
        canvas.style.bottom = (window.innerHeight / 2 + height / 2) + "px";
        this.renderer.resize(width, height, true);
    }
}