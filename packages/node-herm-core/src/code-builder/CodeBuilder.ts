import { CodeBlock } from "./CodeBlock";

export class CodeBuilder {

    private content: string;

    constructor(content: string = "") {
        this.content = content;
    }

    public block(content: string = "") {
        return new CodeBlock(`${this.content}${content}{\n`);
    }

    public line(content: string, trailingNewLine: boolean = true) {
        const newContent: string = `${this.content}` +
            `${content}${trailingNewLine ? "\n" : ""}`;
        this.content = newContent;
    }

    public toCode() {
        return this.content;
    }
}
