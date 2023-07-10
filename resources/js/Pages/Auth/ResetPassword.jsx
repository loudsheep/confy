import { useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('password.store'));
    };

    return (
        <>

            <form onSubmit={submit}>

                    <input type="text" name="email" id="" placeholder='email' value={data.email} onChange={onHandleChange}/><br />
                    {errors.email} <br />

                    <input type="text" name="password" id="" placeholder='password' value={data.password} onChange={onHandleChange}/><br />
                    {errors.password} <br />

                    <input type="text" name="password_confirmation" id="" placeholder='password_confirmation' value={data.password_confirmation} onChange={onHandleChange}/><br />
                    {errors.password_confirmation} <br /><br />

                    <input type="submit" value="Send" />
            </form>
        </>
    );
}