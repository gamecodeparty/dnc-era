"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Crown, Loader2, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (password !== confirmPassword) {
      setError("As senhas nao coincidem");
      setIsLoading(false);
      return;
    }

    if (password.length < 8) {
      setError("A senha deve ter pelo menos 8 caracteres");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Erro ao criar conta");
        setIsLoading(false);
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/auth/login");
      }, 2000);
    } catch {
      setError("Erro ao criar conta");
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
          <p className="text-slate-400">Crie seu cla e domine o reino</p>
        </div>

        {/* Register Form */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <Crown className="w-5 h-5 text-amber-400" />
            </div>
            <h2 className="text-xl font-bold text-slate-100">Criar Conta</h2>
          </div>

          {success ? (
            <div className="flex flex-col items-center gap-4 py-8">
              <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-bold text-slate-100">
                  Conta criada!
                </h3>
                <p className="text-slate-400 text-sm mt-1">
                  Redirecionando para login...
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="name" className="text-slate-300">
                  Nome
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Seu nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="bg-slate-900/50 border-slate-600 text-slate-100 placeholder:text-slate-500 focus:border-amber-400"
                />
              </div>

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
                  placeholder="Min. 8 caracteres"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-slate-900/50 border-slate-600 text-slate-100 placeholder:text-slate-500 focus:border-amber-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-slate-300">
                  Confirmar Senha
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Repita a senha"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
                    Criando...
                  </>
                ) : (
                  "Criar Conta"
                )}
              </Button>
            </form>
          )}

          {!success && (
            <div className="mt-6 text-center">
              <p className="text-slate-400 text-sm">
                Ja tem conta?{" "}
                <Link
                  href="/auth/login"
                  className="text-amber-400 hover:text-amber-300 font-medium"
                >
                  Entrar
                </Link>
              </p>
            </div>
          )}
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
