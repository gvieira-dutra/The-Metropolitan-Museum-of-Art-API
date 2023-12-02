import { getToken } from "./authenticate"
let token = getToken()

//PUT request to favourites/id route, it will allow us to add an artwork to
//the favourites list
export async function addToFavourites(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`,
    {
      method: "PUT",
      headers: {
        Authorization: `JWT ${token}`,
        "Content-type": "application/json",
      },
    }
  )

  if (res.status === 200) {
    return res.json()
  } else {
    return []
  }
}
//DELETE request to favourites/id route, it will delete from the favourites
//list the artwork with the corresponding id
export async function removeFromFavourites(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `JWT ${token}`,
        "Content-type": "application/json",
      },
    }
  )

  if (res.status === 200) {
    return res.json()
  } else {
    return []
  }
}

//GET request to favourites/ route, it will retrieve all favourites artwork
export async function getFavourites() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites`, {
    method: "GET",
    headers: {
      Authorization: `JWT ${token}`,
      "Content-type": "application/json",
    },
  })

  if (res.status === 200) {
    return res.json()
  } else {
    return []
  }
}

//PUT request to history/id route, it will allow us to add an artwork to
  //the favourites list
export async function addToHistory(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `JWT ${token}`,
      "Content-type": "application/json",
    },
  })

  if (res.status === 200) {
    return res.json()
  } else {
    return []
  }
}

  //DELETE request to history/id route, it will delete given item from history
export async function removeFromHistory(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `JWT ${token}`,
      "Content-type": "application/json",
    },
  })

  if (res.status === 200) {
    return res.json()
  } else {
    return []
  }
}

//GET request to favourites/ route, it will retrieve all history artwork
export async function getHistory() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history`, {
    method: "GET",
    headers: {
      Authorization: `JWT ${token}`,
      "Content-type": "application/json",
    },
  })

  if (res.status === 200) {
    return res.json()
  } else {
    return []
  }
}