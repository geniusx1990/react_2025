export function logErrorToMyService(error: Error, componentStack?: string) {
  console.error('Captured error:', error);
  console.error('Component stack:', componentStack);
}
