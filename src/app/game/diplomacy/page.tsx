"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Handshake, Sword, Shield, Skull, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Demo data
const DEMO_CLANS = [
  {
    id: "ai-clan-1",
    name: "Cla do Norte",
    origin: "VERDANEOS",
    personality: "DEFENDER",
    relation: "NEUTRAL",
    territories: 2,
    militaryPower: 45,
  },
  {
    id: "ai-clan-2",
    name: "Cla do Sul",
    origin: "UMBRAL",
    personality: "OPPORTUNIST",
    relation: "HOSTILE",
    territories: 2,
    militaryPower: 60,
  },
  {
    id: "ai-clan-3",
    name: "Cla do Leste",
    origin: "FERRONATOS",
    personality: "CONQUEROR",
    relation: "TRUSTED",
    territories: 2,
    militaryPower: 80,
  },
  {
    id: "ai-clan-4",
    name: "Cla do Oeste",
    origin: "VERDANEOS",
    personality: "MERCHANT",
    relation: "NEUTRAL",
    territories: 2,
    militaryPower: 35,
  },
];

const getRelationColor = (relation: string) => {
  switch (relation) {
    case "TRUSTED": return "text-green-400 bg-green-500/10 border-green-500/30";
    case "NEUTRAL": return "text-slate-400 bg-slate-500/10 border-slate-500/30";
    case "HOSTILE": return "text-red-400 bg-red-500/10 border-red-500/30";
    default: return "text-slate-400 bg-slate-500/10 border-slate-500/30";
  }
};

const getRelationLabel = (relation: string) => {
  switch (relation) {
    case "TRUSTED": return "Aliado";
    case "NEUTRAL": return "Neutro";
    case "HOSTILE": return "Hostil";
    default: return "Desconhecido";
  }
};

const getOriginLabel = (origin: string) => {
  switch (origin) {
    case "FERRONATOS": return "Ferronatos (+20% militar)";
    case "VERDANEOS": return "Verdaneos (+20% graos)";
    case "UMBRAL": return "Umbral (+30% espionagem)";
    default: return origin;
  }
};

const getPersonalityIcon = (personality: string) => {
  switch (personality) {
    case "CONQUEROR": return <Sword className="w-4 h-4" />;
    case "DEFENDER": return <Shield className="w-4 h-4" />;
    case "OPPORTUNIST": return <Skull className="w-4 h-4" />;
    case "MERCHANT": return <Crown className="w-4 h-4" />;
    default: return null;
  }
};

export default function DiplomacyPage() {
  const router = useRouter();

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
              <h1 className="text-xl font-bold text-slate-100">Diplomacia</h1>
              <p className="text-sm text-slate-400">Gerencie suas relacoes com outros clas</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {DEMO_CLANS.map((clan) => (
            <Card key={clan.id} className="bg-slate-800/80 border-slate-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-slate-700 flex items-center justify-center">
                      {getPersonalityIcon(clan.personality)}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{clan.name}</CardTitle>
                      <p className="text-xs text-slate-400">{getOriginLabel(clan.origin)}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs border ${getRelationColor(clan.relation)}`}>
                    {getRelationLabel(clan.relation)}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-500">Territorios</span>
                    <p className="text-lg font-bold text-slate-200">{clan.territories}</p>
                  </div>
                  <div>
                    <span className="text-slate-500">Poder Militar</span>
                    <p className="text-lg font-bold text-red-400">{clan.militaryPower}</p>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  {clan.relation !== "TRUSTED" && (
                    <Button variant="outline" size="sm" className="flex-1">
                      <Handshake className="w-4 h-4 mr-2" />
                      Propor Paz
                    </Button>
                  )}
                  {clan.relation !== "HOSTILE" && (
                    <Button variant="outline" size="sm" className="flex-1 text-red-400 hover:text-red-300">
                      <Sword className="w-4 h-4 mr-2" />
                      Declarar Guerra
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Diplomacy Info */}
        <Card className="bg-slate-800/80 border-slate-700 mt-6">
          <CardHeader>
            <CardTitle>Regras de Diplomacia</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-400 space-y-2">
            <p><strong className="text-green-400">Aliados:</strong> Nao podem se atacar. Bonus de comercio.</p>
            <p><strong className="text-slate-300">Neutros:</strong> Podem ser atacados na Era da Guerra.</p>
            <p><strong className="text-red-400">Hostis:</strong> Prioridade de ataque para a IA.</p>
            <p className="pt-2 text-amber-400">Na Era da Paz, o Pacto impede ataques entre todos os clas.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
