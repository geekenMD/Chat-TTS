

MODULES.moduleClasses["chat_tts"] = class {

    constructor(id) {
        this.namespace = "chat_tts";
        this.type = "settings";
        this.id = id;
        this.lastclip = 0;
        this.queue = [];

        const instance = this;

        this.defaultSettings.skip = () => {
            if (instance.audio) {
                instance.audio = null;
                instance.check();
            }
        };

        koi.addEventListener("chat", (event) => {
            if (this.settings.enabled) {
                event.links.forEach((link) => {
                event.message = event.message.replace(new RegExp(link), "sent a link");
             });
                this.queue.push(encodeURIComponent(event.sender.username + event.message.trim()));
                this.check();
            }
        });
    }

    check() {
        if (!this.audio && (this.queue.length > 0)) {
            this.audio = new Audio("https://api.casterlabs.co/v1/polly?voice=" + this.settings.text_to_speech_voice + "&text=" + this.queue.shift());

            this.audio.addEventListener("ended", () => {
                this.audio = null;
                this.check();
            });

            this.audio.play();
        }
    }

    getDataToStore() {
        return {
            text_to_speech_voice: this.settings.text_to_speech_voice,
            enabled: this.settings.enabled
        };
    }

    settingsDisplay = {
        text_to_speech_voice: "select",
        enabled: "checkbox",
        skip: "button"
    };

    defaultSettings = {
        text_to_speech_voice: ["Brian", "Russell", "Nicole", "Amy", "Salli", "Joanna", "Matthew", "Ivy", "Joey"],
        // skip: () => {}
        enabled: true
    };

};
