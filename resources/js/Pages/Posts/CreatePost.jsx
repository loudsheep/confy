import { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function CreatePost({ status }) {
    // create empty form
    const { data, setData, post, processing, errors, reset } = useForm({
        body: '',
        images: [],
    });

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const handleImageUpload = (event) => {
        setData("images", [...data.images, event.target.files[0]]);
    };

    const deleteImage = (index) => {
        setData("images", data.images.filter((v, i) => {
            return i !== index;
        }));
    }

    // submit the form, do not reload, and send data to login controller
    const submit = (e) => {
        e.preventDefault();
        post(route('post.store'));
    };

    return (
        <>
            <h1>Create New Post</h1>
            <br />
            <form onSubmit={submit}>
                <textarea name="body" id="" cols="50" rows="20" placeholder='Post content' onChange={handleOnChange} value={data.body}></textarea><br />
                {errors.body}
                <br /><br />

                <input type="file" name="image" id="" onChange={handleImageUpload} />
                <br />

                {data.images.map((value, index) => (
                    <img src={URL.createObjectURL(value)} alt="" style={{ maxWidth: "100px", maxHeight: "100px", cursor: "pointer" }} onClick={() => deleteImage(index)} />
                ))}

                <br /><br />

                <input type="submit" value="Create" />
            </form>
        </>
    )
}