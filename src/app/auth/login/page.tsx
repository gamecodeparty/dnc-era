"use client";

import { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Swords, Loader2, AlertCircle, ArrowLeft } from "lucide-react";
import { MedievalButton } from "@/components/ui/medieval";
import { MedievalCard, MedievalCardContent, MedievalCardHeader, MedievalCardTitle } from "@/components/ui/medieval";
import { OrnamentDivider, CornerOrnaments } from "@/components/ui/medieval";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fadeSlideUp, staggerContainer, staggerItem } from "@/lib/animations";

function LoginForm() {
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
    <main className="min-h-screen flex items-center justify-center px-4 relative">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/bg/auth-guild-hall.png"
          alt="Medieval guild hall"
          fill
          className="object-cover object-center"
          priority
          quality={85}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-medieval-bg-deep/80" />
        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(13,11,9,0.9)_100%)]" />
      </div>

      <motion.div
        className="w-full max-w-md space-y-8 relative z-10"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {/* Logo */}
        <motion.div className="text-center space-y-2" variants={staggerItem}>
          <Link href="/landing" className="inline-block">
            <h1 className="text-4xl font-cinzel-decorative font-bold text-gradient-golden">
              Dice&Cards Era
            </h1>
          </Link>
          <p className="text-medieval-text-secondary font-crimson italic">
            Entre para comandar seu cla
          </p>
        </motion.div>

        {/* Login Form Card */}
        <motion.div variants={staggerItem}>
          <MedievalCard variant="elevated" className="relative overflow-visible">
            <CornerOrnaments />

            <MedievalCardHeader ornament>
              <MedievalCardTitle className="justify-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-medieval-primary/10 flex items-center justify-center">
                  <Swords className="w-5 h-5 text-medieval-primary" />
                </div>
                <span className="text-xl">Entrar</span>
              </MedievalCardTitle>
            </MedievalCardHeader>

            <MedievalCardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-3 bg-medieval-accent/10 border border-medieval-accent/30 rounded-lg text-medieval-accent text-sm"
                  >
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{error}</span>
                  </motion.div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-medieval-text-secondary font-cinzel text-sm">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-medieval-bg-deep/50 border-medieval-primary/30 text-medieval-text-primary placeholder:text-medieval-text-muted focus:border-medieval-primary focus:ring-medieval-primary/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-medieval-text-secondary font-cinzel text-sm">
                    Senha
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-medieval-bg-deep/50 border-medieval-primary/30 text-medieval-text-primary placeholder:text-medieval-text-muted focus:border-medieval-primary focus:ring-medieval-primary/20"
                  />
                </div>

                <MedievalButton
                  type="submit"
                  variant="primary"
                  size="lg"
                  loading={isLoading}
                  className="w-full"
                >
                  {isLoading ? "Entrando..." : "Entrar"}
                </MedievalButton>
              </form>

              <OrnamentDivider variant="dots" size="sm" className="my-6" />

              <div className="text-center">
                <p className="text-medieval-text-muted text-sm font-crimson">
                  Nao tem conta?{" "}
                  <Link
                    href="/auth/register"
                    className="text-medieval-primary hover:text-medieval-primary-bright font-medium transition-colors"
                  >
                    Criar conta
                  </Link>
                </p>
              </div>
            </MedievalCardContent>
          </MedievalCard>
        </motion.div>

        {/* Back to landing */}
        <motion.div className="text-center" variants={staggerItem}>
          <Link
            href="/landing"
            className="inline-flex items-center gap-2 text-medieval-text-muted hover:text-medieval-primary text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para pagina inicial
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-medieval-bg-deep" />}>
      <LoginForm />
    </Suspense>
  );
}
