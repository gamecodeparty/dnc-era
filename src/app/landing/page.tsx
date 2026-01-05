import Link from "next/link";
import { Swords, Shield, Users, Scroll, Crown, Skull } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Background pattern */}
      <div className="fixed inset-0 bg-[url('/grid.svg')] opacity-5 pointer-events-none" />

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4">
        <div className="text-center space-y-8 max-w-4xl">
          {/* Logo/Title */}
          <div className="space-y-4">
            <h1 className="text-7xl font-bold bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent">
              Dice&Cards Era
            </h1>
            <p className="text-2xl text-slate-400">
              Lidere seu cla em um mundo medieval dark-fantasy
            </p>
          </div>

          {/* Tagline */}
          <div className="flex items-center justify-center gap-4 text-lg text-slate-500">
            <span className="text-amber-400">Construa</span>
            <span>→</span>
            <span className="text-red-400">Expanda</span>
            <span>→</span>
            <span className="text-purple-400">Sobreviva</span>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-8">
            <FeatureCard
              icon={Shield}
              title="3 Eras"
              description="Paz, Guerra e Invasao"
              color="text-blue-400"
            />
            <FeatureCard
              icon={Swords}
              title="Combate Tatico"
              description="Soldados, Arqueiros, Cavaleiros"
              color="text-red-400"
            />
            <FeatureCard
              icon={Users}
              title="4 Clas IA"
              description="Conquistador, Defensor, Oportunista, Mercador"
              color="text-green-400"
            />
            <FeatureCard
              icon={Crown}
              title="3 Origens"
              description="Ferronatos, Verdaneos, Umbral"
              color="text-amber-400"
            />
            <FeatureCard
              icon={Scroll}
              title="6 Cartas"
              description="Poderes especiais unicos"
              color="text-purple-400"
            />
            <FeatureCard
              icon={Skull}
              title="A Horda"
              description="Sobreviva a invasao"
              color="text-rose-400"
            />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/auth/login">
              <Button
                size="lg"
                className="px-8 py-6 text-lg bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold transition-all hover:scale-105 hover:shadow-lg hover:shadow-amber-500/25"
              >
                Entrar no Jogo
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-6 text-lg border-slate-600 hover:bg-slate-800 transition-all hover:scale-105"
              >
                Criar Conta
              </Button>
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-slate-600 flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-slate-600 rounded-full" />
          </div>
        </div>
      </section>

      {/* Game Overview Section */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-slate-100">
            As Tres Eras
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <EraCard
              era="1"
              title="Paz das Cinzas"
              turns="15 turnos"
              description="O Pacto mantem a paz. Construa sua base, acumule recursos e prepare-se para o inevitavel."
              color="blue"
              icon={Shield}
            />
            <EraCard
              era="2"
              title="Era da Guerra"
              turns="20 turnos"
              description="O Pacto foi rompido. Expanda seu territorio, esmague seus inimigos e domine o mapa."
              color="red"
              icon={Swords}
            />
            <EraCard
              era="3"
              title="A Invasao"
              turns="15 turnos"
              description="A Horda chegou. Sobreviva as ondas de invasao ou pereca junto com seus inimigos."
              color="purple"
              icon={Skull}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 text-center text-slate-500 text-sm">
          <p>Inspirado por RyuDragon e Tribal Wars</p>
          <p className="mt-2">Um produto Dice&Cards RPG</p>
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
  color,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:border-slate-600 transition-colors">
      <Icon className={`w-8 h-8 ${color}`} />
      <span className="font-semibold text-slate-200">{title}</span>
      <span className="text-sm text-slate-400 text-center">{description}</span>
    </div>
  );
}

function EraCard({
  era,
  title,
  turns,
  description,
  color,
  icon: Icon,
}: {
  era: string;
  title: string;
  turns: string;
  description: string;
  color: "blue" | "red" | "purple";
  icon: React.ElementType;
}) {
  const colors = {
    blue: {
      bg: "bg-blue-500/10",
      border: "border-blue-500/30",
      text: "text-blue-400",
      icon: "text-blue-400",
    },
    red: {
      bg: "bg-red-500/10",
      border: "border-red-500/30",
      text: "text-red-400",
      icon: "text-red-400",
    },
    purple: {
      bg: "bg-purple-500/10",
      border: "border-purple-500/30",
      text: "text-purple-400",
      icon: "text-purple-400",
    },
  };

  const c = colors[color];

  return (
    <div
      className={`${c.bg} ${c.border} border rounded-xl p-6 hover:scale-105 transition-transform`}
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className={`w-10 h-10 rounded-lg ${c.bg} flex items-center justify-center`}
        >
          <Icon className={`w-5 h-5 ${c.icon}`} />
        </div>
        <div>
          <span className={`text-sm ${c.text}`}>Era {era}</span>
          <h3 className="font-bold text-slate-100">{title}</h3>
        </div>
      </div>
      <p className="text-slate-400 text-sm mb-4">{description}</p>
      <span className={`text-xs ${c.text}`}>{turns}</span>
    </div>
  );
}
