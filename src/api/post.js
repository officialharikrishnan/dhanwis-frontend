export const LOGIN_API = (data) => {
    return fetch("http://localhost:7001/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then((response) => {
        return response.json();
    });
}

export const GENERATE_OTP = (mobile) => {
    return fetch("http://localhost:7001/otp", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            mobile: mobile
        }),
    }).then((response) => {
        return response.json();
    });
}