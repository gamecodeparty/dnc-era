"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useGameStore, TURN_INTERVAL_MS, TOTAL_TURNS } from "@/stores/gameStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  LogOut,
  Scroll,
  Users,
  Swords,
  HelpCircle,
  Clock,
  Target,
  Shield,
  Wheat,
  TreePine,
  Coins,
  AlertTriangle,
  RefreshCw,
  Trophy,
  Skull,
} from "lucide-react";
import { toast, GameToastContainer } from "@/components/game/GameToast";

function formatTime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function getEraInfo(era: "PEACE" | "WAR" | "INVASION") {
  switch (era) {
    case "PEACE":
      return {
        name: "Paz das Cinzas",
        description: "O Pacto impede ataques. Foque em construir e expandir.",
        color: "text-blue-400",
        bgColor: "bg-blue-500/10",
      };
    case "WAR":
      return {
        name: "Era da Guerra",
        description: "O Pacto foi rompido! Ataque e defenda seus territorios.",
        color: "text-red-400",
        bgColor: "bg-red-500/10",
      };
    case "INVASION":
      return {
        name: "A Invasao",
        description: "A Horda ataca a cada 3 turnos! Sobreviva!",
        color: "text-purple-400",
        bgColor: "bg-purple-500/10",
      };
  }
}

export default function GamePage() {
  const { data: session } = useSession();
  const [selectedTerritoryId, setSelectedTerritoryId] = useState<string | null>(null);
  const [timeToNextTurn, setTimeToNextTurn] = useState(TURN_INTERVAL_MS);

  const {
    currentTurn,
    currentEra,
    territories,
    events,
    gameOver,
    winner,
    getPlayerClan,
    getPlayerTerritories,
    processTurn,
    resetGame,
    attack,
  } = useGameStore();

  const player = getPlayerClan();
  const playerTerritories = getPlayerTerritories();
  const eraInfo = getEraInfo(currentEra);

  // Timer para proximo turno
  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      setTimeToNextTurn((prev) => {
        if (prev <= 1000) {
          processTurn();
          return TURN_INTERVAL_MS;
        }
        return prev - 1000;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [gameOver, processTurn]);

  const selectedTerritory = territories.find((t) => t.id === selectedTerritoryId);
  const timerProgress = ((TURN_INTERVAL_MS - timeToNextTurn) / TURN_INTERVAL_MS) * 100;

  // Calcula producao
  let grainProd = 0, woodProd = 0, goldProd = 0;
  playerTerritories.forEach((t) => {
    t.structures.forEach((s) => {
      if (s.type === "FARM") grainProd += 10 * s.level * (t.bonusResource === "GRAIN" ? 1.25 : 1);
      if (s.type === "SAWMILL") woodProd += 8 * s.level * (t.bonusResource === "WOOD" ? 1.25 : 1);
      if (s.type === "MINE") goldProd += 5 * s.level * (t.bonusResource === "GOLD" ? 1.25 : 1);
    });
  });

  const handleAttack = (toTerritoryId: string) => {
    if (!selectedTerritoryId) return;
    const result = attack(selectedTerritoryId, toTerritoryId);
    if (result.success) {
      toast.combat(result.message);
    } else {
      toast.error(result.message);
    }
  };

  // Game Over / Victory Screen
  if (gameOver) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <Card className={`max-w-lg w-full ${winner ? "bg-green-500/10 border-green-500/30" : "bg-red-500/10 border-red-500/30"}`}>
          <CardContent className="pt-8 text-center space-y-6">
            {winner ? (
              <>
                <Trophy className="w-20 h-20 text-amber-400 mx-auto" />
                <h1 className="text-4xl font-bold text-amber-400">VITORIA!</h1>
                <p className="text-slate-300">Voce sobreviveu ate o turno {currentTurn}!</p>
                <p className="text-slate-400">Territorios: {playerTerritories.length} | Recursos finais: {player.grain} graos, {player.wood} madeira, {player.gold} ouro</p>
              </>
            ) : (
              <>
                <Skull className="w-20 h-20 text-red-400 mx-auto" />
                <h1 className="text-4xl font-bold text-red-400">GAME OVER</h1>
                <p className="text-slate-300">Voce foi derrotado no turno {currentTurn}.</p>
                <p className="text-slate-400">Todos os seus territorios foram perdidos!</p>
              </>
            )}
            <Button onClick={resetGame} className="bg-amber-500 hover:bg-amber-400 text-slate-900">
              <RefreshCw className="w-4 h-4 mr-2" />
              Jogar Novamente
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <GameToastContainer />
      <div className="fixed inset-0 bg-[url('/grid.svg')] opacity-5 pointer-events-none" />

      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/80 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold text-amber-400">Dice&Cards Era</h1>
              <Link href="/game/como-jogar">
                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-amber-400">
                  <HelpCircle className="w-4 h-4 mr-1" />
                  Como Jogar
                </Button>
              </Link>
            </div>

            {/* Turn Timer */}
            <div className="flex items-center gap-4">
              <div className={`px-4 py-2 rounded-lg ${eraInfo.bgColor} border border-slate-700`}>
                <div className="flex items-center gap-2">
                  <span className={`font-bold ${eraInfo.color}`}>{eraInfo.name}</span>
                  <span className="text-slate-400">|</span>
                  <span className="text-slate-300">Turno {currentTurn}/{TOTAL_TURNS}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-lg">
                <Clock className="w-4 h-4 text-amber-400" />
                <div className="w-20">
                  <div className="text-xs text-slate-400">Proximo</div>
                  <div className="text-lg font-mono text-amber-400">{formatTime(timeToNextTurn)}</div>
                </div>
                <Progress value={timerProgress} className="w-16 h-2" />
              </div>
            </div>

            <div className="flex items-center gap-4">
              {session?.user && (
                <span className="text-sm text-slate-400">{session.user.name || session.user.email}</span>
              )}
              <Button variant="ghost" size="sm" onClick={() => signOut({ callbackUrl: "/landing" })}>
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 container mx-auto px-4 py-4 relative z-10">
        <div className="grid grid-cols-12 gap-4">
          {/* Left sidebar */}
          <div className="col-span-3 space-y-4">
            {/* Objetivo */}
            <Card className={`${eraInfo.bgColor} border-slate-700`}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Objetivo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`text-sm ${eraInfo.color}`}>{eraInfo.description}</p>
              </CardContent>
            </Card>

            {/* Recursos */}
            <Card className="bg-slate-800/80 border-slate-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Recursos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Wheat className="w-5 h-5 text-amber-400" />
                    <span className="text-slate-300">Graos</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-amber-400">{Math.floor(player.grain)}</span>
                    <span className="text-xs text-green-400 ml-1">+{Math.floor(grainProd)}/turno</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TreePine className="w-5 h-5 text-green-400" />
                    <span className="text-slate-300">Madeira</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-green-400">{Math.floor(player.wood)}</span>
                    <span className="text-xs text-green-400 ml-1">+{Math.floor(woodProd)}/turno</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Coins className="w-5 h-5 text-yellow-400" />
                    <span className="text-slate-300">Ouro</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-yellow-400">{Math.floor(player.gold)}</span>
                    <span className="text-xs text-green-400 ml-1">+{Math.floor(goldProd)}/turno</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Info do Cla */}
            <Card className="bg-slate-800/80 border-slate-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Seu Cla</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300">Territorios: <span className="text-amber-400 font-bold">{playerTerritories.length}</span></p>
              </CardContent>
            </Card>

            {/* Acoes */}
            <Card className="bg-slate-800/80 border-slate-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Acoes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href="/game/cards" className="block">
                  <Button variant="outline" className="w-full justify-start text-sm h-9">
                    <Scroll className="w-4 h-4 mr-2 text-purple-400" />
                    Cartas
                  </Button>
                </Link>
                <Link href="/game/diplomacy" className="block">
                  <Button variant="outline" className="w-full justify-start text-sm h-9">
                    <Users className="w-4 h-4 mr-2 text-green-400" />
                    Diplomacia
                  </Button>
                </Link>
                <Link href="/game/army" className="block">
                  <Button variant="outline" className="w-full justify-start text-sm h-9">
                    <Swords className="w-4 h-4 mr-2 text-red-400" />
                    Exercito
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Main map area */}
          <div className="col-span-6">
            <div className="mb-3 text-center">
              <p className="text-sm text-slate-400">Clique em um territorio para ver detalhes</p>
            </div>

            {/* Mapa 4x3 */}
            <div className="grid grid-cols-4 gap-2">
              {territories.map((territory) => {
                const isPlayer = territory.ownerId === "player";
                const isSelected = selectedTerritoryId === territory.id;
                const isNeutral = territory.ownerId === null;

                return (
                  <div
                    key={territory.id}
                    onClick={() => setSelectedTerritoryId(territory.id)}
                    className={`
                      aspect-square rounded-lg border-2 cursor-pointer transition-all p-2
                      ${isPlayer ? "bg-amber-500/20 border-amber-500 hover:bg-amber-500/30" : ""}
                      ${isNeutral ? "bg-slate-500/20 border-slate-500 hover:bg-slate-500/30" : ""}
                      ${!isPlayer && !isNeutral ? "bg-red-500/20 border-red-500 hover:bg-red-500/30" : ""}
                      ${isSelected ? "ring-2 ring-white scale-105" : ""}
                    `}
                  >
                    <div className="text-xs text-center">
                      <div className="font-bold">{territory.position + 1}</div>
                      <div className="text-[10px] truncate">{territory.ownerName}</div>
                      {territory.bonusResource === "GRAIN" && <Wheat className="w-3 h-3 mx-auto text-amber-400" />}
                      {territory.bonusResource === "WOOD" && <TreePine className="w-3 h-3 mx-auto text-green-400" />}
                      {territory.bonusResource === "GOLD" && <Coins className="w-3 h-3 mx-auto text-yellow-400" />}
                      {territory.units.length > 0 && (
                        <div className="flex items-center justify-center gap-1 mt-1">
                          <Swords className="w-3 h-3 text-red-400" />
                          <span className="text-[10px]">{territory.units.reduce((sum, u) => sum + u.quantity, 0)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Legenda */}
            <div className="mt-4 flex justify-center gap-6 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-amber-500/30 border border-amber-500"></div>
                <span className="text-slate-400">Seu</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-red-500/30 border border-red-500"></div>
                <span className="text-slate-400">Inimigo</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-slate-500/30 border border-slate-500"></div>
                <span className="text-slate-400">Neutro</span>
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="col-span-3 space-y-4">
            {selectedTerritory ? (
              <Card className="bg-slate-800/80 border-slate-700">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center justify-between text-base">
                    <span>Territorio {selectedTerritory.position + 1}</span>
                    <span className={`text-sm font-normal px-2 py-1 rounded ${
                      selectedTerritory.ownerId === "player"
                        ? "bg-amber-500/20 text-amber-400"
                        : selectedTerritory.ownerId
                          ? "bg-red-500/20 text-red-400"
                          : "bg-slate-500/20 text-slate-400"
                    }`}>
                      {selectedTerritory.ownerName}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 p-2 bg-slate-700/50 rounded">
                    {selectedTerritory.bonusResource === "GRAIN" && <Wheat className="w-5 h-5 text-amber-400" />}
                    {selectedTerritory.bonusResource === "WOOD" && <TreePine className="w-5 h-5 text-green-400" />}
                    {selectedTerritory.bonusResource === "GOLD" && <Coins className="w-5 h-5 text-yellow-400" />}
                    <span className="text-amber-400 text-sm">+25% {selectedTerritory.bonusResource}</span>
                  </div>

                  <div>
                    <h4 className="text-xs font-medium text-slate-500 mb-2">ESTRUTURAS ({selectedTerritory.structures.length}/4)</h4>
                    {selectedTerritory.structures.length > 0 ? (
                      <ul className="space-y-1">
                        {selectedTerritory.structures.map((s, i) => (
                          <li key={i} className="text-sm flex items-center gap-2">
                            <Shield className="w-3 h-3 text-slate-400" />
                            {s.type} Nv{s.level}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-slate-500 italic">Nenhuma</p>
                    )}
                  </div>

                  <div>
                    <h4 className="text-xs font-medium text-slate-500 mb-2">UNIDADES</h4>
                    {selectedTerritory.units.length > 0 ? (
                      <ul className="space-y-1">
                        {selectedTerritory.units.map((u, i) => (
                          <li key={i} className="text-sm flex items-center gap-2">
                            <Swords className="w-3 h-3 text-red-400" />
                            {u.quantity}x {u.type}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-slate-500 italic">Nenhuma</p>
                    )}
                  </div>

                  {selectedTerritory.ownerId === "player" ? (
                    <Link href={`/game/territory/${selectedTerritory.id}`} className="block">
                      <Button className="w-full bg-amber-500 hover:bg-amber-400 text-slate-900">
                        Gerenciar Territorio
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      className="w-full bg-red-500/20 text-red-400 hover:bg-red-500/30"
                      disabled={currentEra === "PEACE" || !playerTerritories.some((t) => t.units.length > 0)}
                      onClick={() => handleAttack(selectedTerritory.id)}
                    >
                      {currentEra === "PEACE" ? "Bloqueado na Paz" : "Atacar"}
                    </Button>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-slate-800/80 border-slate-700">
                <CardContent className="py-8 text-center">
                  <Target className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                  <p className="text-slate-500 text-sm">Selecione um territorio</p>
                </CardContent>
              </Card>
            )}

            {/* Eventos */}
            <Card className="bg-slate-800/80 border-slate-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  Eventos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-xs max-h-40 overflow-auto">
                  {events.map((event, i) => (
                    <li
                      key={i}
                      className={`py-1 border-b border-slate-700 last:border-0 ${
                        event.type === "success" ? "text-green-400" :
                        event.type === "danger" ? "text-red-400" :
                        event.type === "warning" ? "text-amber-400" :
                        "text-slate-400"
                      }`}
                    >
                      [{event.turn}] {event.message}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
