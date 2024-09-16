import { useSelector } from "react-redux"
import { useGetCartQuery } from "../../services/api"
import { getToken } from '../../services/localStorage';

export default function Cart() {
    const { access_token, refresh_token } = getToken()
    const { data } = useGetCartQuery({ access_token })
    console.log(data)
    return (
        <div>
            <h1>Cart</h1>
        </div>
    )
}