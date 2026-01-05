"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Swords, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/game";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
        setIsLoading(false);
        return;
      }

      router.push(callbackUrl);
    } catch {
      setError("Erro ao fazer login");
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4">
      <div className="fixed inset-0 bg-[url('/grid.svg')] opacity-5 pointer-events-none" />

      <div className="w-full max-w-md space-y-8 relative">
        {/* Logo */}
        <div className="text-center space-y-2">
          <Link href="/landing" className="inline-block">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent">
              Dice&Cards Era
            </h1>
          </Link>
          <p className="text-slate-400">Entre para comandar seu cla</p>
        </div>

        {/* Login Form */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <Swords className="w-5 h-5 text-amber-400" />
            </div>
            <h2 className="text-xl font-bold text-slate-100">Entrar</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-300">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-slate-900/50 border-slate-600 text-slate-100 placeholder:text-slate-500 focus:border-amber-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-300">
                Senha
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-slate-900/50 border-slate-600 text-slate-100 placeholder:text-slate-500 focus:border-amber-400"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full py-6 text-lg bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold transition-all hover:scale-105 hover:shadow-lg hover:shadow-amber-500/25 disabled:opacity-50 disabled:hover:scale-100"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Entrando...
                </>
              ) : (
                "Entrar"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-slate-400 text-sm">
              Nao tem conta?{" "}
              <Link
                href="/auth/register"
                className="text-amber-400 hover:text-amber-300 font-medium"
              >
                Criar conta
              </Link>
            </p>
          </div>
        </div>

        {/* Back to landing */}
        <div className="text-center">
          <Link
            href="/landing"
            className="text-slate-500 hover:text-slate-400 text-sm"
          >
            ← Voltar para pagina inicial
          </Link>
        </div>
      </div>
    </main>
  );
}
