import { useSelector } from "react-redux"
import { getToken } from '../../services/localStorage';

export default function Cart() {
    const { access_token, refresh_token } = getToken()
    return (
        <div>
            <h1>Cart</h1>
        </div>
    )
}