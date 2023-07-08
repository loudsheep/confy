import { useEffect } from 'react';
import { useForm } from '@inertiajs/react';

export default function Register() {
    // create empty form
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    // clear password filed on page rerender
    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const handleOnChange = (event) => {
        // TODO after adding Remember Me checkbox, add condition to pass either event.target.value or event.target.checked
        setData(event.target.name, event.target.value);
    };

    // submit the form, do not reload, and send data to login controller
    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <>
            <form onSubmit={submit}>
                <input type="text" name="name" placeholder={"name"} onChange={handleOnChange} />    <br />
                {errors.name} <br /><br />

                <input type="text" name="email" placeholder={"email"} onChange={handleOnChange} />    <br />
                {errors.email} <br /><br />

                <input type="password" name="password" placeholder={"password"} onChange={handleOnChange} />    <br />
                {errors.password} <br /><br />

                <input type="password" name="password_confirmation" placeholder={"password_confirmation"} onChange={handleOnChange} /> <br />
                {errors.password_confirmation} <br /><br />

                <input type="submit" value="Register" />
            </form>
        </>
    )
}