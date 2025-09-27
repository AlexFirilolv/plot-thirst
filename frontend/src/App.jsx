import './App.css'
import { Navbar01 } from './components/ui/shadcn-io/navbar-01'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { useToast } from './components/ui/toast'
import { AuroraBackground } from './components/ui/shadcn-io/aurora-background'
import { LandingPage } from './components/LandingPage'
import { AgeVerification, useAgeVerification } from './components/AgeVerification'

function AppContent() {
  const { isAuthenticated, isLoading } = useAuth();
  const { ToastContainer } = useToast();
  const { isVerified, isLoading: ageLoading, handleVerified } = useAgeVerification();

  // Show loading while checking auth or age verification
  if (isLoading || ageLoading) {
    return (
      <AuroraBackground>
        <div className="flex items-center justify-center min-h-screen w-full">
          <div className="text-center space-y-4 z-10 relative">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground mx-auto"></div>
            <p className="text-foreground">Loading...</p>
          </div>
        </div>
      </AuroraBackground>
    );
  }

  return (
    <AuroraBackground>
      <div className="w-full min-h-screen relative z-10 flex flex-col">
        <Navbar01 />
        <main className="flex-1">
          {isAuthenticated ? (
            <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
              <div className="text-center space-y-4 sm:space-y-6">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground">Welcome Back!</h1>
                <p className="text-base sm:text-lg lg:text-xl text-muted-foreground">
                  Ready to continue your interactive storytelling journey?
                </p>
                <div className="mt-8 p-6 bg-card border border-border rounded-lg">
                  <p className="text-muted-foreground">
                    Your personalized story dashboard will be available here soon.
                    Start creating and exploring AI-generated narratives!
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <LandingPage />
          )}
        </main>
      </div>
      <ToastContainer />

      {/* Age Verification Popup */}
      <AgeVerification onVerified={handleVerified} />
    </AuroraBackground>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App
