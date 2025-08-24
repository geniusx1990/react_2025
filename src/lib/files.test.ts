import { fileToBase64 } from './files';

beforeAll(() => {
  Object.defineProperty(global, 'FileReader', {
    writable: true,
    value: class {
      result: string | null = 'data:image/png;base64,Zm9v';
      onload: (() => void) | null = null;
      readAsDataURL() {
        this.onload?.();
      }
    },
  });
});

test('converts file to base64', async () => {
  const file = new File([new Uint8Array([1, 2, 3])], 'a.png', {
    type: 'image/png',
  });
  const b64 = await fileToBase64(file);
  expect(b64).toBe('data:image/png;base64,Zm9v');
});
