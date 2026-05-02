type AiInput = {
  symptoms: string[];
  vitals: {
    systolicBP?: number;
    diastolicBP?: number;
    bmi?: number;
    hasDiabetes?: boolean;
  };
};

type AiOutput = {
  recommendedDepartment: string;
  urgencyLevel: "RED" | "AMBER" | "GREEN";
  rationale: string;
};

export function aiRouter(input: AiInput): AiOutput {
  const { symptoms, vitals } = input;
  const symptomSet = new Set(symptoms.map((s) => s.toLowerCase()));

  if ((vitals.systolicBP || 0) > 180 || symptomSet.has("chest pain")) {
    return {
      recommendedDepartment: "EMERGENCY",
      urgencyLevel: "RED",
      rationale: "Critical blood pressure or severe acute symptoms detected."
    };
  }

  if (vitals.hasDiabetes && (vitals.bmi || 0) >= 30) {
    return {
      recommendedDepartment: "INTERNAL_MEDICINE + NUTRITION",
      urgencyLevel: "AMBER",
      rationale: "Comorbidity risk profile requires physician and nutrition support."
    };
  }

  return {
    recommendedDepartment: "GENERAL_OUTPATIENT",
    urgencyLevel: "GREEN",
    rationale: "No immediate high-risk indicators found."
  };
}
