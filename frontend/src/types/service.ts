export type IServiceItem = {
  id?: string;
  name: string;
  price: string;
  unit?: string;
  approved?: boolean;
  rapproved?: boolean;
  description: string;
  graveyardDetails?: any;
};

export type IServiceListItem = {
  id: string;
  unit: string;
  name: string;
  price: string;
  picture: [];
  approved: boolean;
  companyId: string;
  createdAt: string;
  updatedAt: string;
  description: string;
  graveyardIds: string[];
};

export type IServiceRequestItem = {
  fellesraadId: string;
  graveyardId: string;
  serviceId: string;
  companyId: string;
};

export type IServiceRequestedItem = {
  fellesraadId: string;
  graveyardId: string;
  serviceId: string;
  companyId: string;
  approved: boolean;
  id: string;
  graveyardDetails: {
    approved: boolean;
    content: string;
    fellesraadId: string;
    forecastLink: string;
    id: string;
    location: string;
    name: string;
  };
  serviceDetails: {
    approved: boolean;
    name: string;
    description: string;
    price: string;
    unit: string;
  };
  companyDetails: {
    name?: string;
  };
};
