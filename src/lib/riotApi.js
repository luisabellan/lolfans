import querystring from 'querystring';

const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI;

export const redirectToLogin = () => {
  const queryParams = querystring.stringify({
    client_id: CLIENT_ID,
    response_type: 'code',
    redirect_uri: REDIRECT_URI,
    scope: 'openid',
    state: 'random_string',
  });
  const loginUrl = `https://euw1.accounts.riotgames.com/connect/authorize?${queryParams}`;
  window.location.href = loginUrl;
};
