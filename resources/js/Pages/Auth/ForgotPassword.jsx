import { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status }) {
    // create empty form
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
    });

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    // submit the form, do not reload, and send data to login controller
    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <>
            {status}
            <form onSubmit={submit}>
                <input type="text" name="email" placeholder={"email"} onChange={handleOnChange} value={data.email} />    <br />
                {errors.email}
                <br /><br />

                <input type="submit" value="Send link" />
            </form>


            <a href={route('login')}>Login instead</a>
        </>
    )
}