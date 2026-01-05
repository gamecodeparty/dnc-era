"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Scroll, Sparkles, Shield, Wheat, Eye, Flame, Handshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Demo cards
const DEMO_CARDS = [
  {
    id: "c1",
    type: "REINFORCEMENTS",
    name: "Reforcos",
    description: "+5 soldados imediatamente",
    icon: Sparkles,
    color: "blue",
    usesRemaining: 1,
  },
  {
    id: "c2",
    type: "IMPROVISED_WALLS",
    name: "Muralhas Improvisadas",
    description: "+30% defesa por 3 turnos",
    icon: Shield,
    color: "purple",
    usesRemaining: 1,
  },
];

const ALL_CARDS = [
  {
    type: "REINFORCEMENTS",
    name: "Reforcos",
    description: "+5 soldados imediatamente em um territorio seu",
    icon: Sparkles,
    color: "blue",
    rarity: "Comum",
  },
  {
    type: "IMPROVISED_WALLS",
    name: "Muralhas Improvisadas",
    description: "+30% defesa para um territorio por 3 turnos",
    icon: Shield,
    color: "purple",
    rarity: "Comum",
  },
  {
    type: "BOUNTIFUL_HARVEST",
    name: "Colheita Abundante",
    description: "+50 graos imediatamente",
    icon: Wheat,
    color: "amber",
    rarity: "Incomum",
  },
  {
    type: "INFORMANT",
    name: "Informante",
    description: "Revela unidades e estruturas de um cla inimigo",
    icon: Eye,
    color: "green",
    rarity: "Rara",
  },
  {
    type: "SABOTAGE",
    name: "Sabotagem",
    description: "Destroi uma estrutura nivel 1 do inimigo",
    icon: Flame,
    color: "red",
    rarity: "Rara",
  },
  {
    type: "FORCED_TRUCE",
    name: "Tregua Forcada",
    description: "Impede ataques de um cla por 2 turnos",
    icon: Handshake,
    color: "slate",
    rarity: "Epica",
  },
];

const getCardColors = (color: string) => {
  switch (color) {
    case "blue": return "bg-blue-500/10 border-blue-500/30 hover:border-blue-400";
    case "purple": return "bg-purple-500/10 border-purple-500/30 hover:border-purple-400";
    case "amber": return "bg-amber-500/10 border-amber-500/30 hover:border-amber-400";
    case "green": return "bg-green-500/10 border-green-500/30 hover:border-green-400";
    case "red": return "bg-red-500/10 border-red-500/30 hover:border-red-400";
    case "slate": return "bg-slate-500/10 border-slate-500/30 hover:border-slate-400";
    default: return "bg-slate-500/10 border-slate-500/30";
  }
};

const getIconColor = (color: string) => {
  switch (color) {
    case "blue": return "text-blue-400";
    case "purple": return "text-purple-400";
    case "amber": return "text-amber-400";
    case "green": return "text-green-400";
    case "red": return "text-red-400";
    case "slate": return "text-slate-400";
    default: return "text-slate-400";
  }
};

export default function CardsPage() {
  const router = useRouter();
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => router.back()}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            <div>
              <h1 className="text-xl font-bold text-slate-100">Cartas</h1>
              <p className="text-sm text-slate-400">Use cartas para ganhar vantagem tatica</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Your Cards */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-slate-200 mb-4 flex items-center gap-2">
            <Scroll className="w-5 h-5 text-amber-400" />
            Suas Cartas ({DEMO_CARDS.length})
          </h2>

          {DEMO_CARDS.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {DEMO_CARDS.map((card) => {
                const Icon = card.icon;
                return (
                  <Card
                    key={card.id}
                    className={`${getCardColors(card.color)} border cursor-pointer transition-all hover:scale-105 ${selectedCard === card.id ? "ring-2 ring-amber-400" : ""}`}
                    onClick={() => setSelectedCard(selectedCard === card.id ? null : card.id)}
                  >
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-lg ${getCardColors(card.color)} flex items-center justify-center`}>
                          <Icon className={`w-6 h-6 ${getIconColor(card.color)}`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-slate-200">{card.name}</h3>
                          <p className="text-sm text-slate-400 mt-1">{card.description}</p>
                        </div>
                      </div>

                      {selectedCard === card.id && (
                        <div className="mt-4 pt-4 border-t border-slate-700">
                          <Button className="w-full bg-amber-500 hover:bg-amber-400 text-slate-900">
                            Usar Carta
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <Card className="bg-slate-800/80 border-slate-700">
              <CardContent className="py-8 text-center text-slate-500">
                Voce nao possui cartas. Cartas sao obtidas atraves de eventos ou construindo a Taverna.
              </CardContent>
            </Card>
          )}
        </div>

        {/* All Cards Reference */}
        <div>
          <h2 className="text-lg font-bold text-slate-200 mb-4">Todas as Cartas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ALL_CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <Card key={card.type} className="bg-slate-800/50 border-slate-700">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-lg ${getCardColors(card.color)} flex items-center justify-center`}>
                        <Icon className={`w-5 h-5 ${getIconColor(card.color)}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold text-slate-200">{card.name}</h3>
                          <span className="text-xs text-slate-500">{card.rarity}</span>
                        </div>
                        <p className="text-sm text-slate-400 mt-1">{card.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
