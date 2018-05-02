export class ParticlesConfig {
    constructor(data) {
        this._data = data['data'];
        this._images = data['images'];
    }

    get data(){
        return this._data;
    }

    get images() {
        return this._images;
    }
}