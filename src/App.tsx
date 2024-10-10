import React, { useState } from 'react'
import { Send } from 'lucide-react'
import axios from 'axios'

function App() {
  const [query, setQuery] = useState('')
  const [response, setResponse] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const result = await axios.post('http://localhost:3001/api/search', { query });
      setResponse(JSON.stringify(result.data, null, 2));
    } catch (error) {
      console.error('Error:', error);
      setResponse('エラーが発生しました。');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Tavily Search</h1>
      
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="flex items-center border-b border-gray-300 py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="検索クエリを入力してください"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            className="flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-4 text-white py-1 px-2 rounded"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                検索中...
              </span>
            ) : (
              <span className="flex items-center">
                <Send className="mr-2" size={16} />
                検索
              </span>
            )}
          </button>
        </div>
      </form>
      
      {response && (
        <div className="mt-8 p-4 bg-white rounded-lg shadow-md w-full max-w-2xl">
          <h2 className="text-xl font-semibold mb-2 text-gray-800">検索結果:</h2>
          <pre className="text-gray-600 whitespace-pre-wrap overflow-x-auto">{response}</pre>
        </div>
      )}
    </div>
  )
}

export default App