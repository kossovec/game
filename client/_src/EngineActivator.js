'use strict';

 export class EngineActivator {
     static activate(loaderClass) {
        window['launchGame'] = () => {
            new loaderClass();
        };
    }
}