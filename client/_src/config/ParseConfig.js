import {ParticlesConfig} from "./ParticlesConfig";

export class ParseConfig {
    constructor(config, data){
        this._config = config;
        this._data = data;
        this.parseParticleConfig(data);

    }

    parseParticleConfig(data){
        let particlesConfigs = data['particles'];
        for (let particlesConfig of particlesConfigs) {
            this._config.particleConfig.set(particlesConfig['name'], new ParticlesConfig(particlesConfig));
        }
    }
}