export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">About</h1>

      <p className="text-lg text-gray-700 leading-relaxed">
        This project was developed as part of the{' '}
        <strong>RS School React Course</strong>. It demonstrates working with{' '}
        <em>React Router</em>, API integration, search, pagination, and local
        storage.
      </p>

      <div className="border-t pt-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">👤 Author</h2>
        <p className="text-gray-700">
          Hi! I’m a frontend developer passionate about learning and building
          interactive applications with modern technologies. I enjoy working
          with React, TypeScript, and improving UI/UX.
        </p>
      </div>

      <div className="pt-4">
        <a
          href="https://rs.school/courses/reactjs"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition"
        >
          🔗 RS School React Course
        </a>
      </div>
    </div>
  );
}
