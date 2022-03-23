import React, { useState } from 'react'
import Button from '../../elements/button/Button';
import Input from '../../elements/input/Input';
import { useInput } from '../../hooks/useInput';
import { signIn } from '../../services/firebase/firebase.user';
import styles from './SignIn.module.scss';

function SignIn() {

    const { value: email, bind: bindEmail, reset: resetEmail } = useInput('');
    const { value: password, bind: bindPassword, reset: resetPassword } = useInput('');
    const [validation, setValidation] = useState("");

    const handleSubmitSignIn = async (e) => {
        e.preventDefault();
        try {
            signIn(email, password)
            resetEmail();
            resetPassword();
        } catch {
            setValidation("Whoops, email and/or password incorrect")
        }
    }

    return (
        <div className={styles.signin} >
            <form className={styles.toto} onSubmit={handleSubmitSignIn}>
                <div>
                    <Input type={"email"} placeholder={"Email"} required {...bindEmail} />
                </div>
                <div>
                    <Input type={"password"} placeholder={"Password"} required {...bindPassword} />
                </div>
                <p className="text-danger mt-1">{validation}</p>
                <div>
                    <Button name={"Sign In"} type={"submit"} />
                </div>
            </form>
        </div>
    )
}

export default SignIn
