// ==============================================================================
// DICE&CARDS ERA - CLAN ORIGINS
// ==============================================================================

import type { OriginDefinition } from "../types";

export const ORIGINS: Record<string, OriginDefinition> = {
  FERRONATOS: {
    id: "FERRONATOS",
    name: "Ferronatos",
    description:
      "Forjados nas guerras do passado, os Ferronatos dominam a arte do combate. Suas forjas produzem as melhores armas e armaduras do reino.",
    specialization: "Guerra",
    bonus: {
      type: "military_strength",
      value: 0.20,
    },
    color: "#ef4444", // Red
    bonusIcon: "⚔",
    bonusLabel: "+20% poder militar",
    bonusTooltip: "Ferronatos causam 20% mais dano em combate — ataque e defesa aprimorados por suas forjas ancestrais.",
  },
  VERDANEOS: {
    id: "VERDANEOS",
    name: "Verdaneos",
    description:
      "Guardioes da natureza, os Verdaneos cultivam as terras mais ferteis. Suas colheitas abundantes sustentam exercitos e alimentam nacoes.",
    specialization: "Sustento",
    bonus: {
      type: "grain_production",
      value: 0.20,
    },
    color: "#22c55e", // Green
    bonusIcon: "🌾",
    bonusLabel: "+20% produção de grão",
    bonusTooltip: "Fazendas Verdaneas produzem 20% mais grão por turno — sustento garantido mesmo em tempos de guerra.",
  },
  UMBRAL: {
    id: "UMBRAL",
    name: "Umbral",
    description:
      "Mestres das sombras, os Umbral operam nas trevas. Seus espioes e assassinos sao temidos em todos os reinos.",
    specialization: "Sombras",
    bonus: {
      type: "spy_efficiency",
      value: 0.30,
    },
    color: "#8b5cf6", // Purple
    bonusIcon: "🗡",
    bonusLabel: "+30% eficiência de espiões",
    bonusTooltip: "Espiões Umbral têm 30% mais chance de sucesso em missões de reconhecimento e sabotagem.",
  },
} as const;

export const ORIGIN_LIST = Object.values(ORIGINS);
