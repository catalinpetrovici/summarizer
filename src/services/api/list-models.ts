import { useQuery } from '@tanstack/react-query';

interface ModelsResponse {
  object: 'list';
  data: {
    id: 'string';
    object: 'model';
    owned_by: 'string';
  }[];
}

async function listModels({
  APIKey,
  endpoint,
}: {
  APIKey: string | undefined;
  endpoint: string | undefined;
}) {
  if (!APIKey) {
    throw new Error(`No API key found.`);
  }

  const response = await fetch(`https://${endpoint}/models`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${APIKey}`,
    },
  });

  if (!response.ok) {
    const {
      error: { message },
    } = await response.json();

    throw new Error(message);
  }

  const { data }: ModelsResponse = await response.json();

  return data?.map((model) => model.id)?.sort();
}

export const useListModelsQuery = ({
  APIKey,
  endpoint,
  enabled = true,
}: {
  APIKey: string | undefined;
  endpoint: string | undefined;
  enabled?: boolean;
}) => {
  return useQuery({
    queryKey: ['deepseek', 'models'],
    queryFn: () => listModels({ APIKey, endpoint }),
    enabled,
  });
};
