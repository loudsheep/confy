import { useEffect, useState } from 'react';
import { useForm } from '@inertiajs/react';
import Logo from '@/components/Logo';
import Icon from '@/components/Icon';
import Loader from '@/components/Loader';

export default function Login({ status }) {
    // create empty form
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    // clear password filed on page rerender
    useEffect(() => {
        // return () => {
            reset('password');
        // };
    }, []);

    const [showLoader, setShowLoader] = useState(false);

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    // submit the form, do not reload, and send data to login controller
    const submit = (e) => {
        e.preventDefault();

        setShowLoader(true);
        post(route('login'), {
            onError: () => {
                reset('password')
            }
        });

        if (errors) {
            setShowLoader(false);
        }
    };

    let emailErrors = errors.email ? "error" : "";
    let passwordErrors = errors.password ? "error" : "";

    return (
        <div className='login-page'>
            <div className='login-content'>
                <div className='slogan | column'>
                    <Logo></Logo>
                    <p className='fw-semibold fs-800 clr-neutral-500'>A place designed for conversations.</p>
                </div>
                <div className='login | column'>
                    <div>
                        <h1 className='fw-bold fs-800 clr-neutral-800'>Welcome back!</h1>
                        <p className='fw-regular fs-400 clr-neutral-500'>Login to continue</p>
                    </div>
                    <div>
                        <form onSubmit={submit} className='login-form'>
                            <div className={`input ${emailErrors}`}>
                                <Icon name="User_alt_fill"></Icon>
                                <input type="email" name='email'
                                    placeholder={!errors.email ? "Email" : "Wrong Email"}
                                    onChange={handleOnChange}
                                    value={data.email} />
                            </div>
                            <div className={`input ${passwordErrors}`}>
                                <Icon name="Key_fill"></Icon>
                                <input type="password" name='password'
                                    placeholder={errors.password ?? "Password" }
                                    onChange={handleOnChange}
                                    value={data.password} />
                            </div>
                            <div className='flex space-between'>
                                <div>
                                    <input className='checkbox' type="checkbox" name="remember" id="remember-checkbox" onChange={handleOnChange} />
                                    <label htmlFor="remember-checkbox" checked={data.remember}>Remember Me</label>
                                </div>
                                <a className='link' href={route('password.request')}>Forgot password?</a>
                            </div>
                            <button className='btn' type="submit">
                                {
                                    showLoader ?
                                        <Loader></Loader> :
                                        <p>Log In</p>
                                }
                            </button>
                        </form>
                    </div>
                    <div className="line"></div>
                    <a className='btn' href={route('register')}>Register instead</a>
                </div>
            </div>
        </div>
    )
}