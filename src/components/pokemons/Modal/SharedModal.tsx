'use client';
import Modal from './Modal';
import { ReactNode } from 'react';

export type ModalContentType = 'uncontrolled' | 'rhf';

export default function SharedModal({
  isOpen,
  onClose,
  type,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  type: ModalContentType;
  children: ReactNode;
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={type === 'rhf' ? 'React Hook Form' : 'Uncontrolled Form'}
    >
      {children}
    </Modal>
  );
}
