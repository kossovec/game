
export class  ResizeService {
    getScreenResolution() {
        return {
            width: this.getWidth(),
            height: this.getHeight()
        };
    }

    getWidth() {
        return Math.max(document.documentElement.clientWidth, window.innerWidth);

    }

    getHeight() {
        return window.innerHeight;
    }


    onResize(callback){
        window.addEventListener("resize", callback);
    }
}


