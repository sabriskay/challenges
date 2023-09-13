"use strict";
class Animal {
    constructor(sound) {
        this.sound = sound;
    }
    speak(message) {
        return message.split(' ').map(word => word + ' ' + this.sound).join(' ');
    }
}
class Lion extends Animal {
    constructor() {
        const sound = 'road';
        super(sound);
    }
}
class Tiger extends Animal {
    constructor() {
        const sound = 'grrr';
        super(sound);
    }
}
const lion = new Lion();
const tiger = new Tiger();
console.log(lion.speak("I'm a lion"));
console.log(tiger.speak("Lions suck"));
