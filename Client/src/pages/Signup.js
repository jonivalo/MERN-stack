import { useState } from 'react'
import { useSignup } from '../hooks/useSingup'

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {signup, error, isLoading} = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await signup(email, password)
    }


    return (
        <form className="signup" onSubmit={handleSubmit}>
            <h3>Sign up</h3>
            
            <label>Email:</label>
            <input
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            />
            <h3>Password:</h3>
            
            <label>Email</label>
            <input
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            />
            <button disabled={isLoading} name="button" >Sign up</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default Signup