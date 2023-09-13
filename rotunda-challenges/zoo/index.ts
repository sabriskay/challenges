class Animal {
    public sound: string;
    
    constructor (sound: string) {
        this.sound = sound;
    }

    speak (message: string) {
        const newMessage = message.split(' ');

        return newMessage.map(
            part => `${part} ${this.sound}`
        ).join(' ');
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