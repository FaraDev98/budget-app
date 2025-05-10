'use client';

import { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function AuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      router.push('/dashboard'); // Redirect post-login
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 p-4'>
      <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
        {isLogin ? 'Accedi al tuo account' : 'Crea un nuovo account'}
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mx-auto max-w-sm w-full">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="p-3 rounded-lg bg-transparent border-b-2 dark:border-b-gray-600 text-gray-800 dark:text-white outline-0"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="p-3 rounded-lg bg-transparent border-b-2 dark:border-b-gray-600 text-gray-800 dark:text-white outline-0"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="p-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition font-medium"
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              Attendi...
            </div>
          ) : (
            isLogin ? 'Accedi' : 'Registrati'
          )}
        </button>

        <p className="text-sm text-center text-gray-600 dark:text-gray-400">
          {isLogin ? 'Non hai un account?' : 'Hai già un account?'}{' '}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500 hover:underline ml-1"
          >
            {isLogin ? 'Registrati' : 'Accedi'}
          </button>
        </p>
      </form>
    </div>
  );
}
