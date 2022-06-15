import { IdentityType } from "../../common/models/IdentityType";

export type Record = {
  parentId?: string;
  recordId: string;
  createdByUserId: string;
  identityType: IdentityType;
  geojson: any;
  latitude: number;
  longitude: number;
  geohash: string;
  createdAt: Date;
  updatedAt: Date;
  venueId?: string;
};
