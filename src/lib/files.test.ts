import { fileToBase64 } from './files';

class FileReaderMock {
    public onload: null | (() => void) = null;
    public onerror: null | (() => void) = null;
    public result: string | ArrayBuffer | null = null;
    readAsDataURL(_: File) {
        this.result = 'data:image/png;base64,Zm9v'; // "foo"
        this.onload?.();
    }
}
// @ts-ignore
global.FileReader = FileReaderMock;

test('converts file to base64', async () => {
    const file = new File([new Uint8Array([1,2,3])], 'a.png', { type: 'image/png' });
    const b64 = await fileToBase64(file);
    expect(b64).toBe('data:image/png;base64,Zm9v');
});
