/// <reference types="node" />
export declare function createPDFDocument(data: any, writeData: (chunk: Buffer) => void, endStream: () => void): Promise<void>;
