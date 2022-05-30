import { IdentityType } from "../../common/models/IdentityType";

export type Venue = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  projectId: string;
  createdByUserId: string;
  identityType: IdentityType;
};
