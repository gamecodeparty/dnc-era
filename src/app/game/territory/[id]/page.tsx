"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Hammer, Shield, Sword, Wheat, TreePine, Coins, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGameStore, STRUCTURE_COSTS, UNIT_COSTS, UNIT_STATS, StructureType, UnitType } from "@/stores/gameStore";
import { toast, GameToastContainer } from "@/components/game/GameToast";

const STRUCTURE_INFO: Record<StructureType, { name: string; description: string; icon: typeof Wheat }> = {
  FARM: { name: "Fazenda", description: "Produz +10 graos/turno", icon: Wheat },
  SAWMILL: { name: "Serraria", description: "Produz +8 madeira/turno", icon: TreePine },
  MINE: { name: "Mina", description: "Produz +5 ouro/turno", icon: Coins },
  BARRACKS: { name: "Quartel", description: "Permite treinar Soldados e Arqueiros", icon: Sword },
  STABLE: { name: "Estabulo", description: "Permite treinar Cavaleiros", icon: Shield },
  WALL: { name: "Muralha", description: "+20% defesa por nivel", icon: Shield },
};

const UNIT_INFO: Record<UnitType, { name: string; requires: StructureType }> = {
  SOLDIER: { name: "Soldado", requires: "BARRACKS" },
  ARCHER: { name: "Arqueiro", requires: "BARRACKS" },
  KNIGHT: { name: "Cavaleiro", requires: "STABLE" },
};

export default function TerritoryPage() {
  const params = useParams();
  const router = useRouter();
  const territoryId = params.id as string;

  const { territories, getPlayerClan, build, train, canAfford } = useGameStore();
  const territory = territories.find((t) => t.id === territoryId);
  const player = getPlayerClan();

  if (!territory) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-400">Territorio nao encontrado</p>
      </div>
    );
  }

  if (territory.ownerId !== "player") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-400 mb-4">Voce nao controla este territorio!</p>
          <Button onClick={() => router.push("/game")}>Voltar ao Jogo</Button>
        </div>
      </div>
    );
  }

  const handleBuild = (structureType: StructureType) => {
    const success = build(territoryId, structureType);
    if (success) {
      toast.build(`${STRUCTURE_INFO[structureType].name} construida!`);
    } else {
      toast.error("Recursos insuficientes ou slots cheios!");
    }
  };

  const handleTrain = (unitType: UnitType) => {
    const success = train(territoryId, unitType, 1);
    if (success) {
      toast.success(`${UNIT_INFO[unitType].name} treinado!`);
    } else {
      toast.error("Recursos insuficientes ou falta estrutura!");
    }
  };

  const hasStructure = (type: StructureType) => territory.structures.some((s) => s.type === type);
  const isFull = territory.structures.length >= 4;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <GameToastContainer />
      <div className="fixed inset-0 bg-[url('/grid.svg')] opacity-5 pointer-events-none" />

      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/80 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => router.push("/game")}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
              <div>
                <h1 className="text-xl font-bold text-slate-100">
                  Territorio {territory.position + 1}
                </h1>
                <p className="text-sm text-slate-400">
                  Bonus: +25% {territory.bonusResource}
                </p>
              </div>
            </div>

            {/* Recursos do jogador */}
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Wheat className="w-4 h-4 text-amber-400" />
                <span className="text-amber-400 font-bold">{Math.floor(player.grain)}</span>
              </div>
              <div className="flex items-center gap-1">
                <TreePine className="w-4 h-4 text-green-400" />
                <span className="text-green-400 font-bold">{Math.floor(player.wood)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Coins className="w-4 h-4 text-yellow-400" />
                <span className="text-yellow-400 font-bold">{Math.floor(player.gold)}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 relative z-10">
        <div className="grid grid-cols-12 gap-6">
          {/* Coluna 1: Info do territorio */}
          <div className="col-span-4 space-y-4">
            {/* Estruturas existentes */}
            <Card className="bg-slate-800/80 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Estruturas</span>
                  <span className="text-sm text-slate-400">{territory.structures.length}/4</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {territory.structures.length > 0 ? (
                  territory.structures.map((s, i) => {
                    const info = STRUCTURE_INFO[s.type];
                    const Icon = info.icon;
                    return (
                      <div key={i} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Icon className="w-5 h-5 text-amber-400" />
                          <div>
                            <p className="font-medium text-slate-200">{info.name}</p>
                            <p className="text-xs text-slate-400">Nivel {s.level}</p>
                          </div>
                        </div>
                        <Check className="w-5 h-5 text-green-400" />
                      </div>
                    );
                  })
                ) : (
                  <p className="text-slate-500 text-center py-4">Nenhuma estrutura construida</p>
                )}
              </CardContent>
            </Card>

            {/* Unidades */}
            <Card className="bg-slate-800/80 border-slate-700">
              <CardHeader>
                <CardTitle>Unidades</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {territory.units.length > 0 ? (
                  territory.units.map((u, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Sword className="w-5 h-5 text-red-400" />
                        <div>
                          <p className="font-medium text-slate-200">{u.quantity}x {UNIT_INFO[u.type].name}</p>
                          <p className="text-xs text-slate-400">
                            ATK: {UNIT_STATS[u.type].atk} | DEF: {UNIT_STATS[u.type].def}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-500 text-center py-4">Nenhuma unidade</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Coluna 2: Construir */}
          <div className="col-span-4">
            <Card className="bg-slate-800/80 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Hammer className="w-5 h-5 text-amber-400" />
                  Construir
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {(Object.keys(STRUCTURE_INFO) as StructureType[]).map((type) => {
                  const info = STRUCTURE_INFO[type];
                  const cost = STRUCTURE_COSTS[type];
                  const Icon = info.icon;
                  const alreadyBuilt = hasStructure(type);
                  const affordable = canAfford(cost);
                  const canBuild = !alreadyBuilt && !isFull && affordable;

                  return (
                    <div key={type} className={`p-3 rounded-lg ${canBuild ? "bg-slate-700/50" : "bg-slate-800/30 opacity-60"}`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Icon className="w-5 h-5 text-amber-400" />
                          <span className="font-medium text-slate-200">{info.name}</span>
                        </div>
                        {alreadyBuilt ? (
                          <span className="text-xs text-green-400 flex items-center gap-1">
                            <Check className="w-3 h-3" /> Construido
                          </span>
                        ) : (
                          <Button
                            size="sm"
                            onClick={() => handleBuild(type)}
                            disabled={!canBuild}
                            className={canBuild ? "bg-amber-500 hover:bg-amber-400 text-slate-900" : ""}
                          >
                            Construir
                          </Button>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 mb-2">{info.description}</p>
                      <div className="flex gap-3 text-xs">
                        {cost.grain && (
                          <span className={player.grain >= cost.grain ? "text-amber-400" : "text-red-400"}>
                            {cost.grain} graos
                          </span>
                        )}
                        {cost.wood && (
                          <span className={player.wood >= cost.wood ? "text-green-400" : "text-red-400"}>
                            {cost.wood} madeira
                          </span>
                        )}
                        {cost.gold && (
                          <span className={player.gold >= cost.gold ? "text-yellow-400" : "text-red-400"}>
                            {cost.gold} ouro
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}

                {isFull && (
                  <p className="text-center text-amber-400 text-sm py-2">
                    Territorio cheio! (4/4 estruturas)
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Coluna 3: Treinar */}
          <div className="col-span-4">
            <Card className="bg-slate-800/80 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sword className="w-5 h-5 text-red-400" />
                  Treinar Unidades
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {(Object.keys(UNIT_INFO) as UnitType[]).map((type) => {
                  const info = UNIT_INFO[type];
                  const cost = UNIT_COSTS[type];
                  const stats = UNIT_STATS[type];
                  const hasRequired = hasStructure(info.requires);
                  const affordable = canAfford(cost);
                  const canTrain = hasRequired && affordable;

                  return (
                    <div key={type} className={`p-3 rounded-lg ${canTrain ? "bg-slate-700/50" : "bg-slate-800/30 opacity-60"}`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-slate-200">{info.name}</span>
                        <Button
                          size="sm"
                          onClick={() => handleTrain(type)}
                          disabled={!canTrain}
                          className={canTrain ? "bg-red-500 hover:bg-red-400 text-white" : ""}
                        >
                          Treinar
                        </Button>
                      </div>
                      <div className="flex gap-4 text-xs text-slate-400 mb-2">
                        <span>ATK: {stats.atk}</span>
                        <span>DEF: {stats.def}</span>
                      </div>
                      {!hasRequired && (
                        <p className="text-xs text-red-400 mb-2">
                          Requer: {STRUCTURE_INFO[info.requires].name}
                        </p>
                      )}
                      <div className="flex gap-3 text-xs">
                        {cost.grain && (
                          <span className={player.grain >= cost.grain ? "text-amber-400" : "text-red-400"}>
                            {cost.grain} graos
                          </span>
                        )}
                        {cost.wood && (
                          <span className={player.wood >= cost.wood ? "text-green-400" : "text-red-400"}>
                            {cost.wood} madeira
                          </span>
                        )}
                        {cost.gold && (
                          <span className={player.gold >= cost.gold ? "text-yellow-400" : "text-red-400"}>
                            {cost.gold} ouro
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}

                <div className="pt-4 border-t border-slate-700">
                  <p className="text-xs text-slate-500">
                    Dica: Construa um Quartel para treinar Soldados e Arqueiros.
                    Construa um Estabulo para treinar Cavaleiros.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
