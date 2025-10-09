import { useEffect, useState } from 'react'
import api from './api/api.js'
import './App.css'
import Login from './components/authentication/Login'
import Register from './components/authentication/Register'
import NavigationBar from './components/NavigationBar'

function App() {

const [ isAuthenticated, setIsAuthenticated ] = useState(false)
const [ showLogin, setShowLogin ] = useState(false)
const [ showRegister, setShowRegister ] = useState(false)

useEffect(() => {
  async function verifySession(){
    try {
      await api.get('/verify_token');
      setIsAuthenticated(true);
    }
    catch (error) {
      setIsAuthenticated(false);
    }
  }
  verifySession();
}, []);

const handleAuthSuccess = (authenticated) => {
  setIsAuthenticated(authenticated)
  setShowLogin(false)
  setShowRegister(false)
}

const handleShowLogin = () => {
  setShowLogin(true)
  setShowRegister(false)
}

const handleShowRegister = () => {
  setShowRegister(true)
  setShowLogin(false)
}

  return (
    <div className="min-h-screen">
      <NavigationBar
        isAuthenticated={isAuthenticated}
        onAuthChange={setIsAuthenticated}
        onShowLogin={handleShowLogin}
        onShowRegister={handleShowRegister}
      />

      <main className="pt-16">
        {isAuthenticated ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
            <p className="text-muted-foreground">Your personalized content will appear here.</p>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Welcome to Plot Thirst
              </h1>
              <p className="text-xl text-muted-foreground">
                Indulge in AI-generated erotic stories tailored to your desires
              </p>
            </div>

            {(showLogin || showRegister) && (
              <div className="max-w-md mx-auto">
                {showLogin && <Login onAuthSuccess={handleAuthSuccess}/>}
                {showRegister && <Register onAuthSuccess={handleAuthSuccess}/>}

                <div className="mt-4 text-center">
                  {showLogin ? (
                    <p className="text-sm text-muted-foreground">
                      Don't have an account?{' '}
                      <button
                        onClick={handleShowRegister}
                        className="text-accent hover:underline font-medium"
                      >
                        Sign up
                      </button>
                    </p>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Already have an account?{' '}
                      <button
                        onClick={handleShowLogin}
                        className="text-accent hover:underline font-medium"
                      >
                        Log in
                      </button>
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}

export default App
