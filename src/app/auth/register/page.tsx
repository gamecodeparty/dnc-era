"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Crown, AlertCircle, CheckCircle, ArrowLeft } from "lucide-react";
import { MedievalButton } from "@/components/ui/medieval";
import { MedievalCard, MedievalCardContent, MedievalCardHeader, MedievalCardTitle } from "@/components/ui/medieval";
import { OrnamentDivider, CornerOrnaments } from "@/components/ui/medieval";
import { Sparkles } from "@/components/game/fx";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { staggerContainer, staggerItem, scaleUp } from "@/lib/animations";

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
    <main className="min-h-screen flex items-center justify-center px-4 py-8 relative">
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
        className="w-full max-w-md space-y-6 relative z-10"
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
            Crie seu cla e domine o reino
          </p>
        </motion.div>

        {/* Register Form Card */}
        <motion.div variants={staggerItem}>
          <MedievalCard variant="elevated" className="relative overflow-visible">
            <CornerOrnaments />

            <MedievalCardHeader ornament>
              <MedievalCardTitle className="justify-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-medieval-primary/10 flex items-center justify-center">
                  <Crown className="w-5 h-5 text-medieval-primary" />
                </div>
                <span className="text-xl">Criar Conta</span>
              </MedievalCardTitle>
            </MedievalCardHeader>

            <MedievalCardContent className="p-6">
              <AnimatePresence mode="wait">
                {success ? (
                  <motion.div
                    key="success"
                    variants={scaleUp}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="flex flex-col items-center gap-4 py-8"
                  >
                    <div className="relative w-20 h-20 rounded-full bg-era-peace/20 flex items-center justify-center">
                      <CheckCircle className="w-10 h-10 text-era-peace" />
                      <Sparkles color="#4a7c59" count={8} />
                    </div>
                    <div className="text-center">
                      <h3 className="text-xl font-cinzel font-bold text-medieval-text-primary">
                        Conta criada!
                      </h3>
                      <p className="text-medieval-text-secondary text-sm mt-2 font-crimson">
                        Redirecionando para login...
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-4"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
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
                      <Label htmlFor="name" className="text-medieval-text-secondary font-cinzel text-sm">
                        Nome do Lider
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Seu nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="bg-medieval-bg-deep/50 border-medieval-primary/30 text-medieval-text-primary placeholder:text-medieval-text-muted focus:border-medieval-primary focus:ring-medieval-primary/20"
                      />
                    </div>

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
                        placeholder="Min. 8 caracteres"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="bg-medieval-bg-deep/50 border-medieval-primary/30 text-medieval-text-primary placeholder:text-medieval-text-muted focus:border-medieval-primary focus:ring-medieval-primary/20"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-medieval-text-secondary font-cinzel text-sm">
                        Confirmar Senha
                      </Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Repita a senha"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
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
                      {isLoading ? "Criando..." : "Criar Conta"}
                    </MedievalButton>
                  </motion.form>
                )}
              </AnimatePresence>

              {!success && (
                <>
                  <OrnamentDivider variant="dots" size="sm" className="my-6" />

                  <div className="text-center">
                    <p className="text-medieval-text-muted text-sm font-crimson">
                      Ja tem conta?{" "}
                      <Link
                        href="/auth/login"
                        className="text-medieval-primary hover:text-medieval-primary-bright font-medium transition-colors"
                      >
                        Entrar
                      </Link>
                    </p>
                  </div>
                </>
              )}
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
