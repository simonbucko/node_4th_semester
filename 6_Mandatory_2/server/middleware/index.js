import JWT from "jsonwebtoken"

const respondWithUnauthorized = () => {
    return res.status(403).json({
        errors: [
            {
                msg: "Unauthorized"
            }
        ],
        data: null
    })
}

export const checkAuth = async (req, res, next) => {
    let token = req.header("authorization")
    if (!token) {
        return respondWithUnauthorized();
    }

    token = token.split(" ")[1]

    try {
        const user = await JWT.verify(token, process.env.JWT_SECRET)
        req.user = user
        next()
    } catch (error) {
        return respondWithUnauthorized();
    }
}

export const checkAdmin = async (req, res, next) => {
    if (req.user.isAdmin) next()
    else {
        return respondWithUnauthorized();
    }
}
