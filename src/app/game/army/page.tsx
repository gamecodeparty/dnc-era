"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Sword, Shield, Target, Eye, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

// Demo data
const DEMO_ARMY = {
  totalUnits: 28,
  byType: [
    { type: "SOLDIER", name: "Soldados", count: 15, atk: 10, def: 8, icon: Sword },
    { type: "ARCHER", name: "Arqueiros", count: 8, atk: 12, def: 5, icon: Target },
    { type: "KNIGHT", name: "Cavaleiros", count: 3, atk: 20, def: 15, icon: Shield },
    { type: "SPY", name: "Espioes", count: 2, atk: 5, def: 3, icon: Eye },
  ],
  byTerritory: [
    { territoryId: "t1", position: 1, units: 18, canAttack: true },
    { territoryId: "t2", position: 2, units: 10, canAttack: true },
  ],
  totalAttack: 256,
  totalDefense: 189,
};

const ATTACK_TARGETS = [
  { territoryId: "t4", position: 4, owner: null, ownerName: "Neutro", defense: 0 },
  { territoryId: "t3", position: 3, owner: "ai-clan-1", ownerName: "Cla do Norte", defense: 45 },
  { territoryId: "t5", position: 5, owner: null, ownerName: "Neutro", defense: 0 },
];

export default function ArmyPage() {
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
              <h1 className="text-xl font-bold text-slate-100">Exercito</h1>
              <p className="text-sm text-slate-400">Gerencie suas tropas e planeje ataques</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Army Overview */}
          <div className="col-span-4">
            <Card className="bg-slate-800/80 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sword className="w-5 h-5 text-red-400" />
                  Visao Geral
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-slate-700/50 rounded-lg">
                    <p className="text-2xl font-bold text-red-400">{DEMO_ARMY.totalAttack}</p>
                    <p className="text-xs text-slate-400">Poder de Ataque</p>
                  </div>
                  <div className="text-center p-3 bg-slate-700/50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-400">{DEMO_ARMY.totalDefense}</p>
                    <p className="text-xs text-slate-400">Poder de Defesa</p>
                  </div>
                </div>

                <div className="pt-2">
                  <p className="text-sm text-slate-400 mb-3">Unidades por Tipo</p>
                  {DEMO_ARMY.byType.map((unit) => {
                    const Icon = unit.icon;
                    return (
                      <div key={unit.type} className="flex items-center justify-between py-2 border-b border-slate-700 last:border-0">
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4 text-slate-400" />
                          <span className="text-sm text-slate-300">{unit.name}</span>
                        </div>
                        <span className="font-bold text-slate-200">{unit.count}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Unit Stats */}
            <Card className="bg-slate-800/80 border-slate-700 mt-4">
              <CardHeader>
                <CardTitle>Estatisticas de Unidades</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {DEMO_ARMY.byType.map((unit) => {
                  const Icon = unit.icon;
                  return (
                    <div key={unit.type} className="p-3 bg-slate-700/50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon className="w-4 h-4 text-slate-400" />
                        <span className="font-medium text-slate-200">{unit.name}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-slate-500">ATK:</span>
                          <span className="ml-1 text-red-400">{unit.atk}</span>
                        </div>
                        <div>
                          <span className="text-slate-500">DEF:</span>
                          <span className="ml-1 text-blue-400">{unit.def}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Troop Distribution */}
          <div className="col-span-4">
            <Card className="bg-slate-800/80 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-amber-400" />
                  Distribuicao de Tropas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {DEMO_ARMY.byTerritory.map((territory) => (
                  <div key={territory.territoryId} className="p-4 bg-slate-700/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-slate-200">
                        Territorio {territory.position}
                      </span>
                      <span className="text-lg font-bold text-amber-400">
                        {territory.units} unidades
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        Mover Tropas
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Attack Planner */}
          <div className="col-span-4">
            <Card className="bg-slate-800/80 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-400">
                  <Sword className="w-5 h-5" />
                  Planejar Ataque
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-slate-400">
                  Selecione um territorio para atacar
                </p>

                {ATTACK_TARGETS.map((target) => (
                  <div key={target.territoryId} className="p-4 bg-slate-700/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-bold text-slate-200">Territorio {target.position}</p>
                        <p className="text-xs text-slate-400">{target.ownerName}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-blue-400">DEF: {target.defense}</p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className="w-full bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30"
                    >
                      Atacar
                    </Button>
                  </div>
                ))}

                <div className="pt-4 text-xs text-slate-500">
                  <p className="mb-1">Regras de Combate:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Arqueiros atacam primeiro</li>
                    <li>Cavaleiros: +30% ATK</li>
                    <li>Muralhas: +20% DEF por nivel</li>
                    <li>Vitoria decisiva: 1.5x mais dano</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
