import { useState } from 'react'
import { User, LogOut, LogIn, UserPlus } from 'lucide-react'
import { Button } from './ui/button'
import { Avatar, AvatarFallback } from './ui/avatar'
import api from '../api/api'

function NavigationBar({ isAuthenticated, onAuthChange, onShowLogin, onShowRegister }) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  const handleLogout = async () => {
    try {
      await api.post('/logout')
      onAuthChange(false)
      setIsUserMenuOpen(false)
    } catch (error) {
      console.error('Logout failed:', error)
      // Force logout on client side even if server request fails
      onAuthChange(false)
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Plot Thirst
            </h1>
          </div>

          {/* Navigation Links - Center */}
          <div className="hidden md:flex items-center space-x-8">
            {isAuthenticated && (
              <>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-accent transition-colors duration-300 font-medium"
                >
                  Browse Stories
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-accent transition-colors duration-300 font-medium"
                >
                  My Library
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-accent transition-colors duration-300 font-medium"
                >
                  Generate
                </a>
              </>
            )}
          </div>

          {/* User Actions - Right */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
                  aria-label="User menu"
                >
                  <Avatar className="h-9 w-9 ring-2 ring-primary/20 hover:ring-primary/40 transition-all">
                    <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white">
                      <User className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                </button>

                {/* Dropdown Menu */}
                {isUserMenuOpen && (
                  <>
                    {/* Backdrop */}
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setIsUserMenuOpen(false)}
                    />

                    {/* Menu */}
                    <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg z-50 overflow-hidden">
                      <div className="px-4 py-3 border-b border-border">
                        <p className="text-sm text-muted-foreground">Signed in as</p>
                        <p className="text-sm font-medium text-foreground truncate">User</p>
                      </div>

                      <div className="py-2">
                        <a
                          href="#"
                          className="flex items-center px-4 py-2 text-sm text-foreground hover:bg-accent/10 hover:text-accent transition-colors"
                        >
                          <User className="mr-3 h-4 w-4" />
                          Profile
                        </a>

                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full px-4 py-2 text-sm text-foreground hover:bg-accent/10 hover:text-accent transition-colors"
                        >
                          <LogOut className="mr-3 h-4 w-4" />
                          Logout
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onShowLogin}
                  className="hidden sm:flex"
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={onShowRegister}
                >
                  <UserPlus className="mr-2 h-4 w-4" />
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavigationBar
