export async function searchTracks({ accessToken }, searchValue) {
  const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${searchValue}`, {
    headers: {
      Authorization: "Bearer " + accessToken,
    }
  });
  return await response.json();
}
export async function savePlaylist({ accessToken }, inputValue, playlistTracks) {
  const me = await fetch("https://api.spotify.com/v1/me", {
    headers: { Authorization: "Bearer " + accessToken }
  })
  if (!me.ok) {
    return 'Error in https://api.spotify.com/v1/me endpoint call.';
  }
  const jsonMe = await me.json();
  const createPlaylist = await fetch(`https://api.spotify.com/v1/users/${jsonMe.id}/playlists`, {
    method: "POST",
    headers: { Authorization: "Bearer " + accessToken, "Content-Type": "application/json" },
    body: JSON.stringify({
      name: inputValue,
      description: "Created using Jammming App by Mateo Fain. ",
      public: false
    })
  })
  if (!createPlaylist.ok) {
    return 'Error in https://api.spotify.com/v1/users/${user_id}/playlists endpoint call.';
  }
  const jsonCreatePlaylist = await createPlaylist.json()
  const editPlaylist = await fetch(`https://api.spotify.com/v1/playlists/${jsonCreatePlaylist.id}/tracks`, {
    method: "POST",
    headers: { Authorization: "Bearer " + accessToken, "Content-Type": "application/json" },
    body: JSON.stringify({
      uris: playlistTracks.map(track => track.uri),
    })
  })
  if (!editPlaylist.ok) {
    return 'Error in https://api.spotify.com/v1/playlists/${user_id}/tracks endpoint call.';
  }
  return editPlaylist;
}

export async function authenticate() {
  const clientId = '0dbb664dcada41fbbee57d7f26695090';
  const redirectUri = 'https://' + window.location.host;
  
  const storedCodeVerifier = localStorage.getItem('code_verifier');
  if (storedCodeVerifier === null || storedCodeVerifier === 'null') { // Part 1 of authorization process
    const codeVerifier = generateRandomString(128);
    const codeChallenge = await generateCodeChallenge(codeVerifier);

    const state = generateRandomString(16);
    const scope = 'playlist-modify-private playlist-modify-public';
    localStorage.setItem('code_verifier', codeVerifier);
    const args = new URLSearchParams({
      response_type: 'code',
      client_id: clientId,
      redirect_uri: redirectUri,
      state: state,
      scope: scope,
      code_challenge_method: 'S256',
      code_challenge: codeChallenge
    })
    window.location = 'https://accounts.spotify.com/authorize?' + args;
    return;
  }
  return getAccessToken(clientId, redirectUri); // Part 2 of authorization process
}


async function getAccessToken(clientId, redirectUri) {
  const urlParams = new URLSearchParams(window.location.search);
  localStorage.setItem('code', urlParams.get('code'));
  const code = localStorage.getItem('code');

  const codeVerifier = localStorage.getItem('code_verifier');

  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: redirectUri,
    client_id: clientId,
    code_verifier: codeVerifier
  });

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: body
    });
    if (!response.ok) {
      throw response.status === 400 && new Error('HTTP Status: ' + response.status + " Token can't be refreshed");
    }
    const data = await response.json();
    localStorage.setItem('access_token', JSON.stringify({ accessToken: data.access_token, expDate: (new Date()).getTime() }));
  } catch (error) {
    
  }
  return JSON.parse(localStorage.getItem('access_token'))
}

function generateRandomString(length) {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

async function generateCodeChallenge(codeVerifier) {
  function base64encode(string) {
    return btoa(String.fromCharCode.apply(null, new Uint8Array(string)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }

  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await window.crypto.subtle.digest('SHA-256', data);

  return base64encode(digest);
}

export async function refreshToken() {
  // Temporary solution to token refresh error by Spotify API (it needs Client Secret, which I won't expose here)
  const tokenRefresh = localStorage.getItem('token_refresh');
  let value;
  if (tokenRefresh === null || tokenRefresh === 'false') {
    value = true;
    localStorage.setItem('token_refresh', value);
  } else {
    value = false;
    localStorage.setItem('token_refresh', value);
    localStorage.setItem('code_verifier', null);
  }
  const response = await authenticate();
  return response;
}