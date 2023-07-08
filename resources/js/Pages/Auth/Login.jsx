import { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status }) {
    // create empty form
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
    });

    // clear password filed on page rerender
    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const handleOnChange = (event) => {
        // TODO after adding Remember Me checkbox, add condition to pass either event.target.value or event.target.checked
        setData(event.target.name, event.target.value);
    };

    // submit the form, do not reload, and send data to login controller
    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <>
            <form onSubmit={submit}>
                <input type="text" name="email" placeholder={"email"} onChange={handleOnChange} />    <br />
                {errors.email} <br /><br />
                <input type="password" name="password" placeholder={"password"} onChange={handleOnChange} /> <br />
                {errors.password} <br /><br />

                <input type="submit" value="Login" />
            </form>
        </>
    )
}