import { IServiceItem, IServiceRequestedItem } from "src/types/service";

export const getMergedServiceLists = async (
  services: IServiceItem[],
  rservices: IServiceRequestedItem[]
) => {
  // Filter only approved services
  const approvedServices = services.filter((service) => service.approved);

  // Map over approved services to find matching requests and set rapproved flag accordingly
  const mergedListPromises = approvedServices.map(async (service) => {
    const relatedRServices = rservices
      .filter((rservice) => rservice.serviceId === service.id)
      .map((matchingRService) => {
        const graveyardName = matchingRService?.graveyardDetails?.name;
        if (matchingRService?.approved) {
          return {
            ...service,
            graveyardName,
            rapproved: true,
          };
        }
        return {
          ...service,
          graveyardName,
          rapproved: false,
        };
      });

    // If there's no matching requests, the service isn't requested/approved.
    if (relatedRServices.length === 0) {
      return service;
    }

    return relatedRServices;
  });

  // Wait for all the promises to resolve then flatten the array in case of multiple matches
  const mergedListNested = await Promise.all(mergedListPromises);
  const mergedList = mergedListNested.flat();

  return mergedList;
};

export const getRequestedServiceLists = async (
  rservices: IServiceRequestedItem[]
) => {
  const mergedListPromises = rservices.map(async (service) => {
    const relatedRServices = {
      id: service.id,
      rapproved: service.approved,
      name: service.serviceDetails.name,
      unit: service.serviceDetails.unit,
      price: service.serviceDetails.price,
      graveyardName: service.graveyardDetails.name,
      description: service.serviceDetails.description,
    };

    return relatedRServices;
  });

  // Wait for all the promises to resolve then flatten the array in case of multiple matches
  const mergedListNested = await Promise.all(mergedListPromises);
  const mergedList = mergedListNested.flat();

  return mergedList;
};
