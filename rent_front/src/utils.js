// Remove blank attributes from an object
export const removeEmpty = (obj) => {
    return Object.fromEntries(
        Object.entries(obj)
            .filter(([_, v]) => v != null)
            .reduce(
                (acc, [k, v]) => ({ ...acc, [k]: v === Object(v) ? removeEmpty(v) : v}),
                {})
            )
};

export const getCurrentUser = () => {
    let userId = null;
    const user = window.localStorage.user;
    if (typeof user === 'number') {
        userId = user;
    }
    return userId;
}

export const getCurrentApartment = () => {
    let apartmentId = null;
    const apartment = window.localStorage.apartment;
    if (typeof apartmentId === 'number') {
        apartmentId = apartment;
    }
    return apartmentId;
}
