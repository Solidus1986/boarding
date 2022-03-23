import React, { useState } from 'react'
import { registerWithEmailAndPassword } from '../../services/firebase/firebase.user';
import Button from '../../elements/button/Button';
import Input from '../../elements/input/Input';
import { useInput } from '../../hooks/useInput';
import styles from './SignUp.module.scss';


function SignUp() {

    const { value: email, bind: bindEmail, reset: resetEmail } = useInput('');
    const { value: displayName, bind: bindDisplayName, reset: resetDisplayName } = useInput('');
    const { value: password, bind: bindPassword, reset: resetPassword } = useInput('');
    const { value: confirmPassword, bind: bindConfirmPassword, reset: resetConfirmPassword } = useInput('');
    const [validation, setValidation] = useState("");

    const handleSubmitSignUp = (e) => {
        e.preventDefault();
        if ((password.length > 0 && confirmPassword.length) && (password === confirmPassword)) {
            registerWithEmailAndPassword(displayName, email, password)
            resetEmail();
            resetDisplayName();
            resetPassword();
            resetConfirmPassword();
        } else {
            setValidation("Whoops, password and confirm password not same")
        }
    }

    return (
        <div className={styles.signup} >
            <form onSubmit={handleSubmitSignUp}>
                <div>
                    <Input type={"mail"} placeholder={"Email"} required {...bindEmail} />
                </div>
                <div>
                    <Input type={"text"} placeholder={"Name"} required {...bindDisplayName} />
                </div>
                <div>
                    <Input type={"password"} placeholder={"Password"} required {...bindPassword} />
                </div>
                <div>
                    <Input type={"password"} placeholder={"Confirm password"} required {...bindConfirmPassword} />
                </div>
                <p className="text-danger mt-1">{validation}</p>
                <div>
                    <Button name={"Sign Up"} type={"submit"} />
                </div>
            </form>
        </div>
    )
}

export default SignUp
