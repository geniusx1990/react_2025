import { render, screen, fireEvent } from '@testing-library/react';
import Modal from './Modal';

test('closes on ESC', () => {
  const onClose = jest.fn();
  render(
    <Modal isOpen title="T" onClose={onClose}>
      <button>Inside</button>
    </Modal>
  );
  fireEvent.keyDown(document, { key: 'Escape' });
  expect(onClose).toHaveBeenCalled();
});

test('closes on outside click and not on inside click', () => {
  const onClose = jest.fn();
  render(
    <Modal isOpen title="T" onClose={onClose}>
      <button>Inside</button>
    </Modal>
  );
  const dialog = screen.getByRole('dialog');
  const backdrop = dialog.firstChild as HTMLElement; // наш абсолютный фон
  fireEvent.mouseDown(backdrop);
  expect(onClose).toHaveBeenCalledTimes(1);

  onClose.mockClear();
  fireEvent.mouseDown(screen.getByText('Inside'));
  expect(onClose).not.toHaveBeenCalled();
});
