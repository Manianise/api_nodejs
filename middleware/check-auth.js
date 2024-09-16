import pkg from 'jsonwebtoken';
const { verify } = pkg;
import 'dotenv/config'

export const checkAuth = (req, res, next) => {

        try {
                // Get authentication token and split from Bearer
                const token = req.headers.authorization.split(" ")[1]
                const decodedToken = verify(token, process.env.JWT_KEY)
		req.userData = decodedToken
next()
        }catch(err) {
                return res.status(401).json({
                        'message' : 'Unauthorized : invalid token',
                        'error': err
                })
        }
}