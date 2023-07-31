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

    //generate dropdown data

    let days = Array.from({length: 31}, (_, i) => i + 1);

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
                                <h2>Personal Info</h2>
                                <div className='flex flex-column gap-500'>
                                    <div className='flex space-between gap-500'>
                                        <div className="input">
                                            <Icon name="User_alt_fill"></Icon>
                                            <input type="text" name='first_name' placeholder='First Name'
                                                size={5} />
                                        </div>
                                        <div className="input">
                                            <Icon name="User_alt_fill"></Icon>
                                            <input type="text" name='last_name' placeholder='Last Name'
                                                size={5} />
                                        </div>
                                    </div>
                                    <div className="input">
                                        <Icon name="User_alt_fill"></Icon>
                                        <input type="email" name='email' placeholder='Email' />
                                    </div>
                                </div>
                            </section>
                            <section className='section'>
                                <h2>Birthday</h2>
                                <div className='flex space-between gap-500'>
                                    <Dropdown name="Day" options={days}></Dropdown>
                                    <Dropdown name="Month" options={[]}></Dropdown>
                                    <Dropdown name="Year" options={[]}></Dropdown>
                                </div>
                            </section>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}