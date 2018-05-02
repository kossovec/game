export class GameConfig {
    constructor() {
        this.designWidth = 1136;
        this.designHeight = 640;
        this.desktopBaseWidth = 1536;
        this.desktopBaseHeight = 768;

        this.screenSizeData = {
            scale: 1,
            size: {x:0, y:0},
            divergence: {x:0, y:0},
        };
        this.gameResourse = [
            "./data/assets/asset_0.json"
        ],
        this.particleConfig = new Map();

    }

}