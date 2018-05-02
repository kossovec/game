
export class ResourceLoader {

    constructor() {
        this._loader = PIXI.loader;
    }

    load(recourse, endCallBack) {
        recourse.forEach(value => {
            this._loader.add(value)
        });
        this._loader.load(endCallBack);
    }
}