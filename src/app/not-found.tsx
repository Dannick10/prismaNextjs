export default function NotFound() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h1 className="text-4xl font-bold mb-4">Página não encontrada</h1>
        <p className="text-gray-600 mb-6">Desculpe, não conseguimos encontrar essa página.</p>
        <a href="/" className="text-blue-500 underline">Voltar para a página inicial</a>
      </div>
    );
  }
  