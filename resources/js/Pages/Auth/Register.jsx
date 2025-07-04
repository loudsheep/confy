import { useEffect } from 'react';
import { useForm } from '@inertiajs/react';

export default function Register() {
    // create empty form
    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: '',
        last_name: '',
        date_of_birth: '',
        email: '',
        password: '',
        password_confirmation: '',
        avatar: null,
    });

    // clear password filed on page rerender
    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const handleFileUpload = (event) => {
        setData(event.target.name, event.target.files[0]);
    }

    // submit the form, do not reload, and send data to login controller
    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <>
            TODO more fields: first_name, last_name, date_of_birth, profile_image, profile_description, etc.
            <form onSubmit={submit}>
                <input type="text" name="first_name" placeholder={"First name"} onChange={handleOnChange} />    <br />
                {errors.first_name} <br /><br />

                <input type="text" name="last_name" placeholder={"Last name"} onChange={handleOnChange} />    <br />
                {errors.last_name} <br /><br />

                <input type="date" name="date_of_birth" placeholder={"date of birth"} onChange={handleOnChange} />    <br />
                {errors.date_of_birth} <br /><br />

                <input type="email" name="email" placeholder={"email"} onChange={handleOnChange} />    <br />
                {errors.email} <br /><br />

                <input type="password" name="password" placeholder={"password"} onChange={handleOnChange} />    <br />
                {errors.password} <br /><br />

                <input type="password" name="password_confirmation" placeholder={"password_confirmation"} onChange={handleOnChange} /> <br />
                {errors.password_confirmation} <br /><br />

                <input type="file" name="avatar" id="" onChange={handleFileUpload} /> <br />
                {errors.avatar} <br /><br />

                {data.avatar !== null && (
                    <img src={URL.createObjectURL(data.avatar)} alt="" style={{ maxWidth: "200px", maxHeight: "200px" }} />
                )}

                <br />

                <input type="submit" value="Register" />
            </form>

            <a href={route('login')}>Login instead</a>
        </>
    )
}