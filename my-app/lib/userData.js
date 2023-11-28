const dotenv = require('dotenv')
dotenv.config()

export async function addToFavourites(id) {
  //PUT request to favourites/id route, it will allow us to add an artwork to
  //the favourites list
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `JWT ${token}`,
      'content-type': 'application/json'
    }
  })

  const data = await res.json()

  if (res.status === 200) {
    return data
  } else {
    return []
  }
}

export async function removeFromFavourites(id) {
  //DELETE request to favourites/id route, it will delete from the favourites
  //list the artwork with the corresponding id
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `JWT ${token}`,
      'content-type': 'application/json'
    }
  })

  const data = await res.json()

  if (res.status === 200) {
    return data
  } else {
    return []
  }
}

export async function getFavourites(id) {
  //GET request to favourites/ route, it will retrieve all favourites artwork
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites`, {
    method: 'GET',
    headers: {
      Authorization: `JWT ${token}`,
      'content-type': 'application/json'
    }
  })

  const data = await res.json()

  if (res.status === 200) {
    return data
  } else {
    return []
  }
}

export async function addToHistory(id) {
  //PUT request to history/id route, it will allow us to add an artwork to
  //the favourites list
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `JWT ${token}`,
      'content-type': 'application/json'
    }
  })

  const data = await res.json()

  if (res.status === 200) {
    return data
  } else {
    return []
  }
}

export async function removeFromHistory(id) {
  //DELETE request to history/id route, it will delete given item from history
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `JWT ${token}`,
      'content-type': 'application/json'
    }
  })

  const data = await res.json()

  if (res.status === 200) {
    return data
  } else {
    return []
  }
}

export async function getHistory(id) {
  //GET request to favourites/ route, it will retrieve all history artwork
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history`, {
    method: 'GET',
    headers: {
      Authorization: `JWT ${token}`,
      'content-type': 'application/json'
    }
  })

  const data = await res.json()

  if (res.status === 200) {
    return data
  } else {
    return []
  }
}
