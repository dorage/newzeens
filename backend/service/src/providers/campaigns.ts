import { Ky } from "../libs/kysely";

const selectCampaigns = () => {
  return Ky.selectFrom("campaigns").selectAll().execute();
};

const CampaignProvider = {
  selectCampaigns,
};

export default CampaignProvider;
