export abstract class Conection {
    abstract getResponse(url:string, methodType:string, dataType:string, data:object): string;
    abstract session(): void;
}
