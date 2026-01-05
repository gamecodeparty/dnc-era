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
  },
} as const;

export const ORIGIN_LIST = Object.values(ORIGINS);
