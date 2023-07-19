import { useEffect } from 'react';
import { useForm } from '@inertiajs/react';

export default function Login({ status }) {
    // create empty form
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: '',
    });

    // clear password filed on page rerender
    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    // submit the form, do not reload, and send data to login controller
    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <>
            <form onSubmit={submit}>
                <input type="text" name="email" placeholder={"email"} onChange={handleOnChange} value={data.email}/>    <br />
                {errors.email} <br /><br />
                <input type="password" name="password" placeholder={"password"} onChange={handleOnChange} value={data.password}/> <br />
                {errors.password} <br /><br />

                <input type="checkbox" name="remember" id="remember-checkbox" onChange={handleOnChange}/>
                <label htmlFor="remember-checkbox" checked={data.remember}>Remember Me</label>

                <br /><br />

                <input type="submit" value="Login" />
            </form>

            <a href={route('register')}>Register instead</a>
            <br />
            <a href={route('password.request')}>Forgot password?</a>
        </>
    )
}