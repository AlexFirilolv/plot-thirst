import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useAuth } from '@/contexts/AuthContext'
import { useToast } from '@/components/ui/toast'

function Login({ onAuthSuccess }) {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { showToast } = useToast();

  async function handleLogin(e) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await login(loginEmail, loginPassword);

      if (result.success) {
        showToast(result.message, 'success');
        onAuthSuccess(true);
        setLoginEmail('');
        setLoginPassword('');
      } else {
        showToast(result.message, 'error');
      }
    } catch {
      showToast('An unexpected error occurred. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <div className="space-y-2">
        <input
          type="email"
          placeholder="Your email"
          value={loginEmail}
          onChange={(event) => setLoginEmail(event.target.value)}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
            "file:border-0 file:bg-transparent file:text-sm file:font-medium",
            "placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2",
            "focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          )}
          required
        />
        <input
          type="password"
          placeholder="Your password"
          value={loginPassword}
          onChange={(event) => setLoginPassword(event.target.value)}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
            "file:border-0 file:bg-transparent file:text-sm file:font-medium",
            "placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2",
            "focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          )}
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Signing In...' : 'Sign In'}
      </Button>
    </form>
  )
}

export default Login
