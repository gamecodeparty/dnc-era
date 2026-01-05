"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Target,
  Shield,
  Swords,
  Skull,
  Wheat,
  TreePine,
  Coins,
  Hammer,
  Users,
  Scroll,
  Clock,
  MapPin,
  Crown,
  AlertTriangle,
  CheckCircle2,
  Play,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SECTIONS = [
  { id: "inicio", label: "Inicio Rapido", icon: Play },
  { id: "objetivo", label: "Objetivo", icon: Target },
  { id: "eras", label: "As 3 Eras", icon: Clock },
  { id: "recursos", label: "Recursos", icon: Coins },
  { id: "territorios", label: "Territorios", icon: MapPin },
  { id: "construcoes", label: "Construcoes", icon: Hammer },
  { id: "unidades", label: "Unidades", icon: Swords },
  { id: "combate", label: "Combate", icon: Shield },
  { id: "diplomacia", label: "Diplomacia", icon: Users },
  { id: "cartas", label: "Cartas", icon: Scroll },
];

export default function ComoJogarPage() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("inicio");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="fixed inset-0 bg-[url('/grid.svg')] opacity-5 pointer-events-none" />

      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => router.push("/game")}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar ao Jogo
              </Button>
              <h1 className="text-2xl font-bold text-amber-400">Como Jogar</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Navegacao lateral */}
          <div className="col-span-3">
            <Card className="bg-slate-800/80 border-slate-700 sticky top-24">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-slate-400">SECOES</CardTitle>
              </CardHeader>
              <CardContent className="p-2">
                <nav className="space-y-1">
                  {SECTIONS.map((section) => {
                    const Icon = section.icon;
                    return (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                          activeSection === section.id
                            ? "bg-amber-500/20 text-amber-400"
                            : "text-slate-400 hover:bg-slate-700/50 hover:text-slate-200"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {section.label}
                      </button>
                    );
                  })}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Conteudo principal */}
          <div className="col-span-9 space-y-6">
            {/* INICIO RAPIDO */}
            {activeSection === "inicio" && (
              <div className="space-y-6">
                <Card className="bg-amber-500/10 border-amber-500/30">
                  <CardHeader>
                    <CardTitle className="text-2xl text-amber-400 flex items-center gap-3">
                      <Play className="w-8 h-8" />
                      Inicio Rapido - Seus Primeiros 5 Minutos
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-lg text-slate-300">
                      Siga estes passos para comecar a jogar imediatamente:
                    </p>

                    <div className="grid gap-4">
                      {[
                        {
                          step: 1,
                          title: "Clique em um territorio AMARELO",
                          desc: "Territorios amarelos sao seus. Clique em um deles no mapa.",
                          icon: MapPin,
                          color: "amber",
                        },
                        {
                          step: 2,
                          title: "Clique em 'Gerenciar Territorio'",
                          desc: "Um painel aparecera a direita. Clique no botao amarelo.",
                          icon: Target,
                          color: "amber",
                        },
                        {
                          step: 3,
                          title: "Construa uma FAZENDA",
                          desc: "Fazendas produzem graos. Graos alimentam suas tropas.",
                          icon: Wheat,
                          color: "amber",
                        },
                        {
                          step: 4,
                          title: "Construa um QUARTEL",
                          desc: "Quarteis permitem treinar soldados para defesa e ataque.",
                          icon: Shield,
                          color: "red",
                        },
                        {
                          step: 5,
                          title: "Treine SOLDADOS",
                          desc: "Com o quartel pronto, treine soldados para proteger seu territorio.",
                          icon: Swords,
                          color: "red",
                        },
                      ].map((item) => (
                        <div
                          key={item.step}
                          className={`flex items-start gap-4 p-4 rounded-lg bg-slate-800/50 border border-slate-700`}
                        >
                          <div className={`w-10 h-10 rounded-full bg-${item.color}-500/20 flex items-center justify-center text-${item.color}-400 font-bold text-lg`}>
                            {item.step}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-slate-200 flex items-center gap-2">
                              <item.icon className={`w-5 h-5 text-${item.color}-400`} />
                              {item.title}
                            </h4>
                            <p className="text-slate-400 text-sm mt-1">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                      <div className="flex items-start gap-3">
                        <Clock className="w-6 h-6 text-blue-400 mt-1" />
                        <div>
                          <h4 className="font-bold text-blue-400">Turnos Automaticos</h4>
                          <p className="text-slate-400 text-sm">
                            O jogo avanca automaticamente a cada <strong className="text-blue-300">5 minutos</strong>.
                            Nao precisa clicar em nada! O timer no topo mostra quanto tempo falta.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* OBJETIVO */}
            {activeSection === "objetivo" && (
              <Card className="bg-slate-800/80 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-2xl text-amber-400 flex items-center gap-3">
                    <Target className="w-8 h-8" />
                    Objetivo do Jogo
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-lg text-slate-300 space-y-4">
                    <p>
                      <strong className="text-amber-400">Dice&Cards Era</strong> eh um jogo de estrategia onde voce
                      lidera um cla atraves de <strong>50 turnos</strong> divididos em 3 eras.
                    </p>

                    <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                      <h4 className="font-bold text-amber-400 text-xl mb-2">Para Vencer:</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-400" />
                          <span>Sobreviva ate o turno 50</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-400" />
                          <span>Mantenha pelo menos 1 territorio</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-400" />
                          <span>Sobreviva aos ataques da Horda na Era 3</span>
                        </li>
                      </ul>
                    </div>

                    <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                      <h4 className="font-bold text-red-400 text-xl mb-2">Voce Perde Se:</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <AlertTriangle className="w-5 h-5 text-red-400" />
                          <span>Perder todos os seus territorios</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <AlertTriangle className="w-5 h-5 text-red-400" />
                          <span>Ser destruido pela Horda</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* ERAS */}
            {activeSection === "eras" && (
              <Card className="bg-slate-800/80 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-2xl text-amber-400 flex items-center gap-3">
                    <Clock className="w-8 h-8" />
                    As 3 Eras
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-slate-300">
                    O jogo tem 50 turnos divididos em 3 eras. Cada era tem regras diferentes:
                  </p>

                  <div className="space-y-4">
                    {/* Era 1 */}
                    <div className="p-6 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                          <Shield className="w-6 h-6 text-blue-400" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-blue-400">Era 1: Paz das Cinzas</h3>
                          <p className="text-slate-500">Turnos 1-15 (15 turnos)</p>
                        </div>
                      </div>
                      <div className="space-y-2 text-slate-300">
                        <p><strong>O que acontece:</strong> Um pacto de paz impede todos os ataques.</p>
                        <p><strong>O que fazer:</strong></p>
                        <ul className="list-disc list-inside ml-4 text-slate-400">
                          <li>Construa fazendas, serrarias e minas</li>
                          <li>Treine soldados para a Era 2</li>
                          <li>Acumule recursos</li>
                        </ul>
                      </div>
                    </div>

                    {/* Era 2 */}
                    <div className="p-6 bg-red-500/10 border border-red-500/30 rounded-lg">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-lg bg-red-500/20 flex items-center justify-center">
                          <Swords className="w-6 h-6 text-red-400" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-red-400">Era 2: Era da Guerra</h3>
                          <p className="text-slate-500">Turnos 16-35 (20 turnos)</p>
                        </div>
                      </div>
                      <div className="space-y-2 text-slate-300">
                        <p><strong>O que acontece:</strong> O pacto eh rompido! Ataques sao liberados.</p>
                        <p><strong>O que fazer:</strong></p>
                        <ul className="list-disc list-inside ml-4 text-slate-400">
                          <li>Ataque territorios inimigos e neutros</li>
                          <li>Defenda seus territorios</li>
                          <li>Expanda seu imperio</li>
                        </ul>
                      </div>
                    </div>

                    {/* Era 3 */}
                    <div className="p-6 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
                          <Skull className="w-6 h-6 text-purple-400" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-purple-400">Era 3: A Invasao</h3>
                          <p className="text-slate-500">Turnos 36-50 (15 turnos)</p>
                        </div>
                      </div>
                      <div className="space-y-2 text-slate-300">
                        <p><strong>O que acontece:</strong> A Horda de monstros invade o mapa!</p>
                        <p><strong>O que fazer:</strong></p>
                        <ul className="list-disc list-inside ml-4 text-slate-400">
                          <li>A Horda ataca TODOS a cada 3 turnos</li>
                          <li>Forca da Horda aumenta: 50 → 300</li>
                          <li>Sobreviva ate o turno 50!</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* RECURSOS */}
            {activeSection === "recursos" && (
              <Card className="bg-slate-800/80 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-2xl text-amber-400 flex items-center gap-3">
                    <Coins className="w-8 h-8" />
                    Recursos
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-slate-300">
                    Existem 3 recursos no jogo. Voce ganha recursos automaticamente a cada turno.
                  </p>

                  <div className="grid gap-4">
                    <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg flex items-start gap-4">
                      <Wheat className="w-10 h-10 text-amber-400" />
                      <div>
                        <h4 className="font-bold text-amber-400 text-lg">Graos</h4>
                        <p className="text-slate-400">Alimenta sua populacao e tropas. Sem graos, suas tropas morrem!</p>
                        <p className="text-slate-500 text-sm mt-1">Produzido por: Fazendas</p>
                      </div>
                    </div>

                    <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex items-start gap-4">
                      <TreePine className="w-10 h-10 text-green-400" />
                      <div>
                        <h4 className="font-bold text-green-400 text-lg">Madeira</h4>
                        <p className="text-slate-400">Usada para construir estruturas e algumas unidades.</p>
                        <p className="text-slate-500 text-sm mt-1">Produzido por: Serrarias</p>
                      </div>
                    </div>

                    <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg flex items-start gap-4">
                      <Coins className="w-10 h-10 text-yellow-400" />
                      <div>
                        <h4 className="font-bold text-yellow-400 text-lg">Ouro</h4>
                        <p className="text-slate-400">Usado para treinar unidades de elite e upgrades.</p>
                        <p className="text-slate-500 text-sm mt-1">Produzido por: Minas</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-700/50 rounded-lg">
                    <h4 className="font-bold text-slate-300 mb-2">Dica:</h4>
                    <p className="text-slate-400">
                      Territorios tem bonus de +25% para um tipo de recurso.
                      Construa a estrutura correspondente para maximizar a producao!
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* TERRITORIOS */}
            {activeSection === "territorios" && (
              <Card className="bg-slate-800/80 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-2xl text-amber-400 flex items-center gap-3">
                    <MapPin className="w-8 h-8" />
                    Territorios
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-slate-300">
                    O mapa tem 12 territorios. Voce comeca com 2, e compete com 4 clas de IA.
                  </p>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg text-center">
                      <div className="w-12 h-12 rounded-lg bg-amber-500/30 border-2 border-amber-500 mx-auto mb-2" />
                      <h4 className="font-bold text-amber-400">Seu Territorio</h4>
                      <p className="text-slate-400 text-sm">Clique para gerenciar</p>
                    </div>

                    <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-center">
                      <div className="w-12 h-12 rounded-lg bg-red-500/30 border-2 border-red-500 mx-auto mb-2" />
                      <h4 className="font-bold text-red-400">Inimigo</h4>
                      <p className="text-slate-400 text-sm">Ataque na Era 2+</p>
                    </div>

                    <div className="p-4 bg-slate-500/10 border border-slate-500/30 rounded-lg text-center">
                      <div className="w-12 h-12 rounded-lg bg-slate-500/30 border-2 border-slate-500 mx-auto mb-2" />
                      <h4 className="font-bold text-slate-400">Neutro</h4>
                      <p className="text-slate-400 text-sm">Conquiste na Era 2+</p>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-700/50 rounded-lg">
                    <h4 className="font-bold text-slate-300 mb-2">Cada territorio tem:</h4>
                    <ul className="space-y-1 text-slate-400">
                      <li>• <strong>4 slots</strong> para construcoes</li>
                      <li>• <strong>Bonus</strong> de +25% para um recurso</li>
                      <li>• <strong>Unidades</strong> para defesa/ataque</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* CONSTRUCOES */}
            {activeSection === "construcoes" && (
              <Card className="bg-slate-800/80 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-2xl text-amber-400 flex items-center gap-3">
                    <Hammer className="w-8 h-8" />
                    Construcoes
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-slate-300">
                    Construa estruturas em seus territorios. Cada territorio tem 4 slots.
                  </p>

                  <div className="grid gap-3">
                    {[
                      { name: "Fazenda", desc: "Produz graos", icon: Wheat, color: "amber", priority: "ESSENCIAL" },
                      { name: "Serraria", desc: "Produz madeira", icon: TreePine, color: "green", priority: "ESSENCIAL" },
                      { name: "Mina", desc: "Produz ouro", icon: Coins, color: "yellow", priority: "IMPORTANTE" },
                      { name: "Quartel", desc: "Treina soldados e arqueiros", icon: Swords, color: "red", priority: "ESSENCIAL" },
                      { name: "Estabulo", desc: "Treina cavaleiros", icon: Crown, color: "purple", priority: "AVANCADO" },
                      { name: "Muralha", desc: "+20% defesa por nivel", icon: Shield, color: "blue", priority: "IMPORTANTE" },
                    ].map((building) => (
                      <div key={building.name} className="flex items-center gap-4 p-3 bg-slate-700/50 rounded-lg">
                        <building.icon className={`w-8 h-8 text-${building.color}-400`} />
                        <div className="flex-1">
                          <h4 className="font-bold text-slate-200">{building.name}</h4>
                          <p className="text-slate-400 text-sm">{building.desc}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded ${
                          building.priority === "ESSENCIAL" ? "bg-red-500/20 text-red-400" :
                          building.priority === "IMPORTANTE" ? "bg-amber-500/20 text-amber-400" :
                          "bg-slate-500/20 text-slate-400"
                        }`}>
                          {building.priority}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                    <h4 className="font-bold text-amber-400 mb-2">Ordem recomendada:</h4>
                    <p className="text-slate-400">
                      1. Fazenda → 2. Quartel → 3. Serraria → 4. Mina ou Muralha
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* UNIDADES */}
            {activeSection === "unidades" && (
              <Card className="bg-slate-800/80 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-2xl text-amber-400 flex items-center gap-3">
                    <Swords className="w-8 h-8" />
                    Unidades Militares
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-slate-300">
                    Treine unidades para atacar inimigos e defender seus territorios.
                  </p>

                  <div className="grid gap-4">
                    {[
                      { name: "Soldado", atk: 10, def: 8, req: "Quartel", desc: "Unidade basica, barata e eficiente" },
                      { name: "Arqueiro", atk: 12, def: 5, req: "Quartel", desc: "Ataca primeiro no combate!" },
                      { name: "Cavaleiro", atk: 20, def: 15, req: "Estabulo", desc: "+30% bonus de ataque" },
                      { name: "Espiao", atk: 5, def: 3, req: "Guilda das Sombras", desc: "Revela informacoes do inimigo" },
                    ].map((unit) => (
                      <div key={unit.name} className="p-4 bg-slate-700/50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-bold text-slate-200 text-lg">{unit.name}</h4>
                          <span className="text-xs text-slate-500">Requer: {unit.req}</span>
                        </div>
                        <p className="text-slate-400 text-sm mb-2">{unit.desc}</p>
                        <div className="flex gap-4 text-sm">
                          <span className="text-red-400">ATK: {unit.atk}</span>
                          <span className="text-blue-400">DEF: {unit.def}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* COMBATE */}
            {activeSection === "combate" && (
              <Card className="bg-slate-800/80 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-2xl text-amber-400 flex items-center gap-3">
                    <Shield className="w-8 h-8" />
                    Sistema de Combate
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-slate-300">
                    Combates sao resolvidos automaticamente comparando Ataque vs Defesa.
                  </p>

                  <div className="space-y-4">
                    <div className="p-4 bg-slate-700/50 rounded-lg">
                      <h4 className="font-bold text-slate-200 mb-2">Formula Basica:</h4>
                      <p className="text-slate-400 font-mono text-center text-lg">
                        Poder de Ataque vs Poder de Defesa + Muralhas
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                        <h4 className="font-bold text-red-400 mb-2">Bonus de Ataque</h4>
                        <ul className="text-slate-400 text-sm space-y-1">
                          <li>• Cavaleiros: +30%</li>
                          <li>• Vitoria decisiva (1.5x mais tropas): 2x dano</li>
                        </ul>
                      </div>
                      <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                        <h4 className="font-bold text-blue-400 mb-2">Bonus de Defesa</h4>
                        <ul className="text-slate-400 text-sm space-y-1">
                          <li>• Muralha Nv1: +20%</li>
                          <li>• Muralha Nv2: +40%</li>
                          <li>• Muralha Nv3: +60%</li>
                        </ul>
                      </div>
                    </div>

                    <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                      <h4 className="font-bold text-purple-400 mb-2">Arqueiros Atacam Primeiro!</h4>
                      <p className="text-slate-400">
                        Antes do combate principal, arqueiros causam dano sem receber contra-ataque.
                        Ter muitos arqueiros eh uma grande vantagem!
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* DIPLOMACIA */}
            {activeSection === "diplomacia" && (
              <Card className="bg-slate-800/80 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-2xl text-amber-400 flex items-center gap-3">
                    <Users className="w-8 h-8" />
                    Diplomacia
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-slate-300">
                    Negocie com outros clas para formar aliancas ou declarar guerra.
                  </p>

                  <div className="grid gap-4">
                    <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                      <h4 className="font-bold text-green-400 mb-2">Aliados (TRUSTED)</h4>
                      <p className="text-slate-400">Nao podem se atacar. Compartilham informacoes.</p>
                    </div>
                    <div className="p-4 bg-slate-500/10 border border-slate-500/30 rounded-lg">
                      <h4 className="font-bold text-slate-400 mb-2">Neutros (NEUTRAL)</h4>
                      <p className="text-slate-400">Podem ser atacados na Era 2+.</p>
                    </div>
                    <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                      <h4 className="font-bold text-red-400 mb-2">Hostis (HOSTILE)</h4>
                      <p className="text-slate-400">IA prioriza atacar voce. Cuidado!</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* CARTAS */}
            {activeSection === "cartas" && (
              <Card className="bg-slate-800/80 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-2xl text-amber-400 flex items-center gap-3">
                    <Scroll className="w-8 h-8" />
                    Cartas Especiais
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-slate-300">
                    Cartas dao poderes especiais de uso unico. Use no momento certo!
                  </p>

                  <div className="grid gap-3">
                    {[
                      { name: "Reforcos", desc: "+5 soldados imediatamente", color: "blue" },
                      { name: "Muralhas Improvisadas", desc: "+30% defesa por 3 turnos", color: "purple" },
                      { name: "Colheita Abundante", desc: "+50 graos imediatamente", color: "amber" },
                      { name: "Informante", desc: "Revela forcas inimigas", color: "green" },
                      { name: "Sabotagem", desc: "Destroi estrutura inimiga Nv1", color: "red" },
                      { name: "Tregua Forcada", desc: "Impede ataques de um cla por 2 turnos", color: "slate" },
                    ].map((card) => (
                      <div key={card.name} className={`p-3 bg-${card.color}-500/10 border border-${card.color}-500/30 rounded-lg flex items-center gap-3`}>
                        <Scroll className={`w-6 h-6 text-${card.color}-400`} />
                        <div>
                          <h4 className={`font-bold text-${card.color}-400`}>{card.name}</h4>
                          <p className="text-slate-400 text-sm">{card.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-700/50 rounded-lg">
                    <p className="text-slate-400">
                      Cartas sao obtidas aleatoriamente ou construindo uma <strong className="text-amber-400">Taverna</strong>.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Navegacao entre secoes */}
            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  const idx = SECTIONS.findIndex(s => s.id === activeSection);
                  if (idx > 0) setActiveSection(SECTIONS[idx - 1].id);
                }}
                disabled={activeSection === SECTIONS[0].id}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Anterior
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  const idx = SECTIONS.findIndex(s => s.id === activeSection);
                  if (idx < SECTIONS.length - 1) setActiveSection(SECTIONS[idx + 1].id);
                }}
                disabled={activeSection === SECTIONS[SECTIONS.length - 1].id}
              >
                Proximo
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
