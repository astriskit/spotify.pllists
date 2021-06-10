// eslint-disable-next-line import/prefer-default-export
import axios from 'axios';

// eslint-disable-next-line operator-linebreak
const basic =
  'OTE0MTg3ZTI3NjY5NGUxN2FhMjlhYzE4NjY3ZGFhOTU6Njg4NWNhMjAwZmJjNDljZjgyNmJhNzU4ZTE2NGZiNTE=';

export const getToken = async (force = false) => {
  try {
    if (!force) {
      const token = sessionStorage.getItem('token');
      if (token && token !== 'undefined') {
        return token;
      }
    }
    const apiAdd = 'https://accounts.spotify.com/api/token';

    const apiParams = new URLSearchParams();
    apiParams.append('grant_type', 'client_credentials');

    const {
      data: { access_token: token },
    } = await axios.post(apiAdd, apiParams, {
      headers: {
        Authorization: `Basic ${basic}`,
        'content-type': 'application/x-www-form-urlencoded',
      },
    });
    sessionStorage.setItem('token', token);
    return token;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(`Access token not generated: ${err.message}`);
    throw err;
  }
};

export const playlists = (
  { offset = 0, limit = 20, country = 'IN' },
  token,
) => {
  const apiAdd = `https://api.spotify.com/v1/browse/featured-playlists?country=${country}&offset=${offset}&limit=${limit}`;
  return axios.get(apiAdd, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const tkPlaylists = async (
  { offset = 0, limit = 20, country = 'IN' } = {},
  forceReload = false,
) => {
  try {
    const token = await getToken(forceReload);
    if (token) {
      const { data } = await playlists(
        {
          offset,
          limit,
          country,
        },
        token,
      );
      return data;
    }
    throw new Error('Token not found');
  } catch (error) {
    if (
      error?.response.status === 401 &&
      error?.response.data?.error?.message.includes('token expired')
    ) {
      return tkPlaylists(
        {
          offset,
          limit,
          country,
        },
        true,
      );
    }
    // eslint-disable-next-line no-console
    console.error(`Playlists not fetched: ${error.message}`);
    throw error;
  }
};
