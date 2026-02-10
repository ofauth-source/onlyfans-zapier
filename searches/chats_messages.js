const perform = async (z, bundle) => {
  const response = await z.request({
    url: `https://api-next.ofauth.com/v2/access/chats/${bundle.inputData.userId}/messages`,
    method: 'GET',
    headers: {
      apiKey: bundle.authData.apiKey,
      ...(bundle.inputData.connectionId && { 'x-connection-id': bundle.inputData.connectionId }),
    },
    params: bundle.inputData,
  });
  
  const data = response.data;
  return Array.isArray(data) ? data : (data.list || [data]);
};

module.exports = {
  key: 'chats_messages',
  noun: 'Messages',
  display: {
    label: 'Find Chat messages',
    description: 'Chat messages **Permission Required:** `messages:read`',
  },
  operation: {
    inputFields: [
    {
      key: 'userId',
      label: 'User Id',
      type: 'string',
      required: true,
      helpText: 'userId',
    },
    {
      key: 'limit',
      label: 'Limit',
      type: 'integer',
      required: false,
      helpText: 'Number of items to return (1-20, default: 10)',
    },
    {
      key: 'offset',
      label: 'Offset',
      type: 'integer',
      required: false,
      helpText: 'Number of items to skip (default: 0)',
    },
    {
      key: 'query',
      label: 'Query',
      type: 'string',
      required: false,
      helpText: 'Search/filter text',
    },
    {
      key: 'id',
      label: 'Id',
      type: 'string',
      required: false,
      helpText: 'ID of the last message from previous page. Used for cursor pagination.',
    },
    {
      key: 'firstId',
      label: 'First Id',
      type: 'string',
      required: false,
      helpText: 'Include this message ID as the first message in the results. Used to retrieve messages from e.g. the Search Chat Messages endpoint IDs.',
    }
    ],
    perform,
    sample: {
      id: 1,
    },
  },
};
