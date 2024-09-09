import { Admin } from "./apis/admin";

(async () => {
  await Admin.getPublisherList();
})();
