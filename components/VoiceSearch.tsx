'use client'

import { useState, useEffect } from 'react'

export default function VoiceSearch() {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [isSupported, setIsSupported] = useState(false)
  
  useEffect(() => {
    // Check if Web Speech API is supported
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      setIsSupported(true)
    }
  }, [])
  
  const startListening = () => {
    if (!isSupported) {
      alert('Voice recognition is not supported in your browser. Please try Chrome or Edge.')
      return
    }
    
    const SpeechRecognition = (window as any).webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    
    recognition.continuous = false
    recognition.interimResults = false
    recognition.lang = 'en-US'
    
    recognition.onstart = () => {
      setIsListening(true)
      setTranscript('Listening...')
    }
    
    recognition.onresult = (event: any) => {
      const speechResult = event.results[0][0].transcript
      setTranscript(speechResult)
      
      // In a real app, this would trigger a search
      console.log('Voice search:', speechResult)
    }
    
    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error)
      setTranscript('Error occurred. Please try again.')
      setIsListening(false)
    }
    
    recognition.onend = () => {
      setIsListening(false)
    }
    
    recognition.start()
  }
  
  return (
    <div className="card">
      <div className="flex items-center gap-4">
        <button
          onClick={startListening}
          disabled={isListening}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
            isListening
              ? 'bg-red-500 text-white cursor-not-allowed'
              : 'bg-primary text-white hover:bg-blue-700'
          }`}
        >
          <span className="text-2xl">{isListening ? '🎤' : '🎙️'}</span>
          <span>{isListening ? 'Listening...' : 'Voice Search'}</span>
        </button>
        
        <div className="flex-grow">
          <input
            type="text"
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            placeholder="Speak or type to search contacts..."
            className="input"
          />
        </div>
        
        <button className="btn btn-primary">
          Search
        </button>
      </div>
      
      {!isSupported && (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
          ⚠️ Voice recognition is not supported in your browser. Please use Chrome or Edge for voice search.
        </div>
      )}
      
      <div className="mt-4 text-sm text-gray-600">
        <p>🎯 Try saying: "Find John Smith" or "Show contacts from TechCorp"</p>
      </div>
    </div>
  )
}