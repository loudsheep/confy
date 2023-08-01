import { useEffect } from 'react';
import { useForm } from '@inertiajs/react';

import Logo from '@/components/Logo';
import Icon from '@/components/Icon';
import Dropdown from '@/components/Dropdown';

export default function Register() {
    // create empty form
    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: '',
        last_name: '',
        date_of_birth: '',
        email: '',
        password: '',
        password_confirmation: '',
        terms: false,
        // avatar: null,
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
        console.log("SUBMIT FORM");

        post(route('register'));
    };

    console.log(errors);

    //generate dropdown data

    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];
    let currentYear = new Date().getFullYear();
    const years = Array.from({ length: (currentYear - 1905 + 1) }, (_, i) => i + 1905).reverse();


    return (
        <div className='register-page'>
            <div className='register-content'>
                <div className='slogan | column'>
                    <Logo></Logo>
                    <p className='fw-semibold fs-800 clr-neutral-500'>A place designed for conversations.</p>
                </div>
                <div className="register | column">
                    <div>
                        <h1 className='fw-bold fs-800 clr-neutral-800'>Create your own account!</h1>
                        <p className='fw-regular fs-400 clr-neutral-500'>Register to continue</p>
                    </div>
                    <div>
                        <form onSubmit={submit} className='register-form'>
                            <section className='section'>
                                <h2 className='fw-semibold'>Personal Info</h2>
                                <div className='flex flex-column gap-500'>
                                    <div className='flex space-between gap-500'>
                                        <div className="input">
                                            <Icon name="User_alt_fill"></Icon>
                                            <input type="text" name='first_name' placeholder='First Name'
                                                size={5} onChange={handleOnChange} value={data.first_name} />
                                        </div>
                                        <div className="input">
                                            <Icon name="User_alt_fill"></Icon>
                                            <input type="text" name='last_name' placeholder='Last Name'
                                                size={5} onChange={handleOnChange} value={data.last_name} />
                                        </div>
                                    </div>
                                    <div className="input">
                                        <Icon name="Message_alt_fill"></Icon>
                                        <input type="email" name='email' placeholder='Email'
                                            onChange={handleOnChange} value={data.email} />
                                    </div>
                                </div>
                            </section>
                            <section className='section'>
                                <h2 className='fw-semibold'>Birthday</h2>
                                <div className='flex space-between gap-500'>
                                    <Dropdown name="Day" options={days}></Dropdown>
                                    <Dropdown name="Month" options={months}></Dropdown>
                                    <Dropdown name="Year" options={years}></Dropdown>
                                </div>
                            </section>
                            <section className="section">
                                <h2 className='fw-semibold'>Password</h2>
                                <div className="input">
                                    <Icon name="Key_fill"></Icon>
                                    <input type="password" name='password' placeholder='Password'
                                        onChange={handleOnChange} value={data.password} />
                                </div>
                                <div className="input">
                                    <Icon name="Key_fill"></Icon>
                                    <input type="password" name='password_confirmation' placeholder='Repeat Password'
                                        onChange={handleOnChange} value={data.password_confirmation} />
                                </div>
                            </section>
                            <section className="section">
                                <div>
                                    <input className='checkbox' type="checkbox" name="terms" id="terms-checkbox"
                                        onChange={handleOnChange} value={data.terms}/>
                                    <label htmlFor="terms-checkbox" checked={data.remember}>I do accept the <a href="" className="link">Terms and Conditions</a></label>
                                </div>
                            </section>
                            <section className='section'>
                                <input className='btn' type="submit" value="Register" />
                            </section>
                        </form>
                    </div>
                    <div className="line"></div>
                    <a href={route('login')} className="btn">Login instead</a>
                </div>
            </div>
        </div>
    )
}