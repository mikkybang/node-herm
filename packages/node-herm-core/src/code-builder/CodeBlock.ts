import { CodeBuilder } from "./CodeBuilder";

export class CodeBlock {

    private content: string;
    constructor(content: string = "") {
        this.content = content;
    }

    public close(content: string = "") {
        return new CodeBuilder(`${this.content}}${content}\n`);
    }

    public line(content: string, trailingNewLine: boolean = true) {
        const newContent: string = `${this.content}` +
            `    ${content}${trailingNewLine ? "\n" : ""}`;
        this.content = newContent;
    }
}
