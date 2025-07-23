import Link from 'next/link'
import Navbar from './components/Navbar'

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0A1F] to-[#16162A] flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col justify-center items-center px-6 py-32 relative">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="w-full max-w-7xl mx-auto flex flex-col items-center space-y-20 relative z-10">
          <div className="space-y-6 text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent tracking-tight">
              AI-Powered PDF Summarization
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              A modern AI-powered PDF summarizer that saves your time by extracting key insights from your PDFs.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link 
              href="/dashboard"
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium
                         px-10 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105
                         hover:shadow-lg hover:shadow-purple-500/25 text-lg"
            >
              Get Started
            </Link>
            <Link
              href="/sign-in"
              className="text-gray-300 hover:text-white px-10 py-4 rounded-2xl 
                         hover:bg-[#1A1A23] transition-all duration-200 text-lg border border-[#2A2A35]"
            >
              Learn More
            </Link>
          </div>

          <div className="pt-10 w-full flex justify-center"></div>
          <div className="pt-12">
            <div className="p-6 rounded-2xl bg-[#1A1A23] border border-[#2A2A35] max-w-3xl mx-auto">
              <div className="flex items-center justify-center space-x-4 text-gray-400">
                <span className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Fast Analysis
                </span>
                <span className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Key Insights
                </span>
                <span className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  AI-Powered
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home