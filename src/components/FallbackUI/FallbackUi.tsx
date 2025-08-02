export const FallbackUi = () => {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4 text-center bg-white text-black dark:bg-gray-950 dark:text-white transition-colors">
      <p className="text-red-600 dark:text-red-400 font-semibold text-lg">
        Something went wrong 😢
      </p>
      <button
        onClick={handleReload}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
      >
        Reload Page
      </button>
    </div>
  );
};
