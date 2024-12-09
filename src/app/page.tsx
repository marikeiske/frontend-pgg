export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold text-blue-600">Bem-vindo ao Paggo!</h1>
      <p className="text-gray-700 mt-4">Gerencie sua aplicação com facilidade.</p>
      <div className="mt-8 space-x-4">
        <a
          href="/login"
          className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Login
        </a>
        <a
          href="/register"
          className="px-6 py-3 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
        >
          Registrar
        </a>
      </div>
    </main>
  );
}

