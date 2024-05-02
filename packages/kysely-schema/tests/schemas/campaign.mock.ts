import { CampaignSchema } from "@/src/schemas/campaigns";
import { generateMock } from "@anatine/zod-mock";
import { ZodFastCheck } from "zod-fast-check";

// Generated 타입인 컬럼 제외하고 전달
const CampaignSchemaWithoutGenerated = CampaignSchema.omit({ created_at: true });

export const getCampaignArbitary = () => ZodFastCheck().inputOf(CampaignSchemaWithoutGenerated);

export const getMockCampaign = () => generateMock(CampaignSchemaWithoutGenerated);
