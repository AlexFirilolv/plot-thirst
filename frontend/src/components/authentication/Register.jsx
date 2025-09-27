import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useAuth } from '@/contexts/AuthContext'
import { useToast } from '@/components/ui/toast'

function Register( { onAuthSuccess } ) {
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const { showToast } = useToast();

  async function handleRegister(e) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await register(registerEmail, registerPassword);

      if (result.success) {
        showToast(result.message, 'success');
        onAuthSuccess(true);
        setRegisterEmail('');
        setRegisterPassword('');
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
    <form onSubmit={handleRegister} className="space-y-4">
      <div className="space-y-2">
        <input
          type="email"
          placeholder="Your email"
          value={registerEmail}
          onChange={(event) => setRegisterEmail(event.target.value)}
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
          value={registerPassword}
          onChange={(event) => setRegisterPassword(event.target.value)}
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
        {isLoading ? 'Creating Account...' : 'Create Account'}
      </Button>
    </form>
  )
}

export default Register
