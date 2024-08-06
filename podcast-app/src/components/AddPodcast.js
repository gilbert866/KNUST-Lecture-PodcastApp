// src/components/AddPodcast.js
import React, { useState, useContext } from 'react';
import { PodcastContext } from '../context/PodcastContext';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { FileUpload } from 'primereact/fileupload';

const AddPodcast = ({ onHide }) => {
    const { addPodcast, setAddDialog } = useContext(PodcastContext);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('audio', file);

        await addPodcast(formData);
        setAddDialog(false);
        onHide();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="p-field">
                <label htmlFor="title">Title</label>
                <InputText id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div className="p-field">
                <label htmlFor="description">Description</label>
                <InputTextarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
            </div>
            <div className="p-field">
                <label htmlFor="audio">Audio File</label>
                <FileUpload name="audio" customUpload auto chooseOptions={{label: 'Choose'}} uploadOptions={{style: {display: 'none'}}} onSelect={(e) => setFile(e.files[0])} />
            </div>
            <Button type="submit" label="Add Podcast" />
        </form>
    );
};

export default AddPodcast;
