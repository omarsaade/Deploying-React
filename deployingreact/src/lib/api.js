const FIREBASE_DOMAIN = 'https://routehttp-9885c-default-rtdb.firebaseio.com';




//btjib kell el data
export async function getAllQuotes() {
  const response = await fetch(`${FIREBASE_DOMAIN}/quotes.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not fetch quotes.');
  }

  const transformedQuotes = [];

  for (const key in data) {
    const quoteObj = {
      id: key,
      ...data[key],
    };

    transformedQuotes.push(quoteObj);
  }

  return transformedQuotes;
}






// btjib data wahde li hye single quote
export async function getSingleQuote(quoteId) {
  const response = await fetch(`${FIREBASE_DOMAIN}/quotes/${quoteId}.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not fetch quote.');
  }

  const loadedQuote = {
    id: quoteId,
    ...data,
  };

  return loadedQuote;
}





// bteb3at data lal firebase
export async function addQuote(quoteData) {
  const response = await fetch(`${FIREBASE_DOMAIN}/quotes.json`, {
    method: 'POST',
    body: JSON.stringify(quoteData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  // console.log(data); { name: '-NAob1i5CCgXVtgo-GCq' }

  if (!response.ok) {
    throw new Error(data.message || 'Could not create quote.');
  }

  return null;
}






//bteb3at data lal firebase
export async function addComment(requestData) {
  // console.log(requestData); //{commentData: {…}, quotedId: '-NAso2VCELsJ3yoFIrvt'}
  // console.log(requestData.quoteId);
  // console.log(requestData.commentData); //{text: 'ali'}
  const response = await fetch(`${FIREBASE_DOMAIN}/comments/${requestData.quoteId}.json`, {
    method: 'POST',
    body: JSON.stringify(requestData.commentData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not add comment.');
  }

  return { commentId: data.name };
}






// btjib kell el comments
export async function getAllComments(quoteId) {
  const response = await fetch(`${FIREBASE_DOMAIN}/comments/${quoteId}.json`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not get comments.');
  }

  const transformedComments = [];


  for (const key in data) {
    const commentObj = {
      id: key,
      text: data[key],
    };

    transformedComments.push(commentObj);
  }
  // console.log(transformedComments);
  return transformedComments;
}
