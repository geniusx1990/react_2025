export default function Loader() {
  return (
    <div
      role="status"
      aria-label="Loading"
      className="flex justify-center items-center"
    >
      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
