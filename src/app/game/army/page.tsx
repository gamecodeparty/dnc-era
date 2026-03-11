"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Sword, Shield, Target, Eye, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MedievalButton } from "@/components/ui/medieval";
import { toast } from "@/components/game/GameToast";
import { useGameStore, type Territory } from "@/stores/gameStore";

export default function ArmyPage() {
  const router = useRouter();
  const { territories, autoDistributeTroops } = useGameStore();

  const playerTerritories: Territory[] = territories.filter((t: Territory) => t.ownerId === "player");

  const handleAutoDistribute = () => {
    autoDistributeTroops();
    toast.success(
      `Tropas distribuídas igualmente entre ${playerTerritories.length} territórios`
    );
  };

  // Aggregate units across all player territories
  const unitTotals: Record<string, number> = {
    SOLDIER: 0,
    ARCHER: 0,
    KNIGHT: 0,
    SPY: 0,
  };
  for (const territory of playerTerritories) {
    for (const unit of territory.units) {
      unitTotals[unit.type] = (unitTotals[unit.type] ?? 0) + unit.quantity;
    }
  }

  const unitDefs = [
    { type: "SOLDIER", name: "Soldados", atk: 10, def: 8, icon: Sword },
    { type: "ARCHER", name: "Arqueiros", atk: 12, def: 5, icon: Target },
    { type: "KNIGHT", name: "Cavaleiros", atk: 20, def: 15, icon: Shield },
    { type: "SPY", name: "Espiões", atk: 5, def: 3, icon: Eye },
  ];

  const totalAttack = unitTotals.SOLDIER * 10 + unitTotals.ARCHER * 12 + unitTotals.KNIGHT * 20 + unitTotals.SPY * 5;
  const totalDefense = unitTotals.SOLDIER * 8 + unitTotals.ARCHER * 5 + unitTotals.KNIGHT * 15 + unitTotals.SPY * 3;

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
              <h1 className="text-xl font-bold text-slate-100">Exército</h1>
              <p className="text-sm text-slate-400">Gerencie suas tropas e planeje ataques</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Auto-Distribute Button */}
        <div className="mb-6">
          <div className="relative group inline-block">
            <MedievalButton
              variant="secondary"
              onClick={handleAutoDistribute}
              disabled={playerTerritories.length <= 1}
            >
              ⚔️ Auto-Distribuir Igualmente
            </MedievalButton>
            <div className="absolute left-0 top-full mt-2 z-10 hidden group-hover:block w-72 bg-slate-800 border border-slate-600 text-slate-200 text-xs rounded-lg p-3 shadow-lg pointer-events-none">
              Distribui todas as suas tropas igualmente entre seus territórios. Territórios com mais estruturas recebem unidades extras quando a divisão não é exata.
              {playerTerritories.length <= 1 && (
                <p className="mt-1 text-amber-400">Você precisa de pelo menos 2 territórios para usar esta função.</p>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Army Overview */}
          <div className="col-span-4">
            <Card className="bg-slate-800/80 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sword className="w-5 h-5 text-red-400" />
                  Visão Geral
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-slate-700/50 rounded-lg">
                    <p className="text-2xl font-bold text-red-400">{totalAttack}</p>
                    <p className="text-xs text-slate-400">Poder de Ataque</p>
                  </div>
                  <div className="text-center p-3 bg-slate-700/50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-400">{totalDefense}</p>
                    <p className="text-xs text-slate-400">Poder de Defesa</p>
                  </div>
                </div>

                <div className="pt-2">
                  <p className="text-sm text-slate-400 mb-3">Unidades por Tipo</p>
                  {unitDefs.map((unit) => {
                    const Icon = unit.icon;
                    return (
                      <div key={unit.type} className="flex items-center justify-between py-2 border-b border-slate-700 last:border-0">
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4 text-slate-400" />
                          <span className="text-sm text-slate-300">{unit.name}</span>
                        </div>
                        <span className="font-bold text-slate-200">{unitTotals[unit.type] ?? 0}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Unit Stats */}
            <Card className="bg-slate-800/80 border-slate-700 mt-4">
              <CardHeader>
                <CardTitle>Estatísticas de Unidades</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {unitDefs.map((unit) => {
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
                  Distribuição de Tropas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {playerTerritories.length === 0 ? (
                  <p className="text-sm text-slate-400">Você não controla nenhum território.</p>
                ) : (
                  playerTerritories.map((territory) => {
                    const unitCount = territory.units.reduce((acc, u) => acc + u.quantity, 0);
                    return (
                      <div key={territory.id} className="p-4 bg-slate-700/50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-bold text-slate-200">
                            Território {territory.position + 1}
                          </span>
                          <span className="text-lg font-bold text-amber-400">
                            {unitCount} unidades
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            Mover Tropas
                          </Button>
                        </div>
                      </div>
                    );
                  })
                )}
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
                  Selecione um território para atacar
                </p>

                {(territories as Territory[])
                  .filter((t: Territory) => t.ownerId !== "player")
                  .slice(0, 3)
                  .map((target: Territory) => {
                    const defPower = target.units.reduce((acc: number, u) => {
                      const def: Record<string, number> = { SOLDIER: 8, ARCHER: 5, KNIGHT: 15, SPY: 3 };
                      return acc + u.quantity * (def[u.type] ?? 0);
                    }, 0);
                    return (
                      <div key={target.id} className="p-4 bg-slate-700/50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="font-bold text-slate-200">Território {target.position + 1}</p>
                            <p className="text-xs text-slate-400">{target.ownerId === null ? "Neutro" : target.ownerId}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-blue-400">DEF: {defPower}</p>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          className="w-full bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30"
                        >
                          Atacar
                        </Button>
                      </div>
                    );
                  })}

                <div className="pt-4 text-xs text-slate-500">
                  <p className="mb-1">Regras de Combate:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Arqueiros atacam primeiro</li>
                    <li>Cavaleiros: +30% ATK</li>
                    <li>Muralhas: +20% DEF por nível</li>
                    <li>Vitória decisiva: 1.5x mais dano</li>
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
