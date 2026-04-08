import qs from "query-string";

type FormUrlQueryTypes = {
  params: string;
  key: string;
  value: string | null;
};

export const formUrlQuery = ({ params, key, value }: FormUrlQueryTypes): string => {
  const parsedParams = qs.parse(params);
  parsedParams[key] = value;
  return qs.stringifyUrl({
    url: window.location.pathname,
    query: parsedParams,
  });
};

type FemoveKeysFromQueryTypes = {
  params: string;
  keysToRemove: string[];
};

export const removeKeysFromQuery = ({ params, keysToRemove }: FemoveKeysFromQueryTypes): string => {
  const parsedParams = qs.parse(params);
  keysToRemove.forEach((k) => delete parsedParams[k]);
  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: parsedParams,
    },
    {
      skipNull: true,
    }
  );
};
