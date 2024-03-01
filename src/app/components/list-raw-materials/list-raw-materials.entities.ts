export class FilterOptions {
    name: string;
    key: string;
    class: string;

    constructor(name: string, key: string, class_styles: string) {
        this.name = name;
        this.key = key;
        this.class = class_styles;
    }
}